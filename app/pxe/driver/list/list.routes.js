(function () {
  angular
    .module('app.pxe.driver.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.driver.list', {
        url: '?q',
        title: 'Drivers',
        controller: 'PxeDriverIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/driver/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
