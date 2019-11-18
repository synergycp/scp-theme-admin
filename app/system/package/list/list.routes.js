(function () {
  angular
    .module('app.system.package.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    $stateProvider
      .state('app.system.package.list', {
        url: '?q',
        title: 'Packages',
        controller: 'PackageIndexCtrl as vm',
        templateUrl: RouteHelpersProvider.basepath('system/package/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
