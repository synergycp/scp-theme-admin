(function () {
  angular
    .module('app.system.integration.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.integration.list', {
        url: '?q',
        title: 'Integrations',
        controller: 'IntegrationIndexCtrl as vm',
        templateUrl: helper.basepath('system/integration/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
