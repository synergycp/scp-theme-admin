(function () {
  angular
    .module('app.network.console.server')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.console', {
        url: '/console',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:console'),
      })
      .state('app.network.console.server', {
        url: '/server',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.network.console.server.view', {
        url: '/:id',
        title: 'View Console Server',
        controller: 'ConsoleServerViewCtrl as vm',
        templateUrl: helper.basepath('network/console/server/server.view.html'),
      })
      .state('app.network.console.server.list', {
        url: '?q',
        title: 'Console Servers',
        controller: 'ConsoleServerIndexCtrl as vm',
        reloadOnSearch: false,
        templateUrl: helper.basepath('network/console/server/list/list.index.html'),
      })
      ;
  }
})();
