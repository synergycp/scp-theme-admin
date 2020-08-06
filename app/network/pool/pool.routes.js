(function () {
  angular
    .module('app.network.pool')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.pool', {
        url: '/pool',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:pool'),
      })
      .state('app.network.pool.view', {
        url: '/:id',
        title: 'View Pool',
        controller: 'PoolViewCtrl as vm',
        templateUrl: helper.basepath('network/pool/pool.view.html'),
      })
      ;

    helper.url.map('pool/?([0-9]*)', function ($state, id) {
      var params = {
        id: id,
      };

      return $state.href(
        'app.network.pool.' + (id ? 'view' : 'list'),
        params
      );
    });
  }
})();
