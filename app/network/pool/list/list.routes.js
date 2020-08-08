(function () {
  angular
    .module('app.network.pool.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.pool.list', {
        url: '?group.id&client.id&q',
        title: 'IP Pools',
        controller: 'PoolIndexCtrl as vm',
        templateUrl: helper.basepath('network/pool/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
