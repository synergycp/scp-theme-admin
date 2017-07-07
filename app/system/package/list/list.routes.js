(function () {
  'use strict';

  angular
    .module('app.system.package.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.package.list', {
        url: '?q',
        title: 'Packages',
        controller: 'PackageIndexCtrl as vm',
        templateUrl: helper.basepath('system/package/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
