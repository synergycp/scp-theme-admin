(function () {
  angular
    .module('app.network.forward.gateway')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.forward', {
        url: '/forward',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:forward'),
      })
      .state('app.network.forward.gateway', {
        url: '/gateway',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.network.forward.gateway.view', {
        url: '/:id',
        title: 'View Port Forwarding Gateway',
        controller: 'ForwardGatewayViewCtrl as vm',
        templateUrl: helper.basepath('network/forward/gateway/gateway.view.html'),
      })
      .state('app.network.forward.gateway.list', {
        url: '?q',
        title: 'Port Forwarding Gateways',
        controller: 'ForwardGatewayIndexCtrl as vm',
        reloadOnSearch: false,
        templateUrl: helper.basepath('network/forward/gateway/list/list.index.html'),
      })
      ;

    helper.url.map('forward/gateway/?([0-9]*)', function ($state, id) {
      return 'network/forward/gateway'+(id && '/'+id);
    });
  }
})();
