(function () {
  'use strict';

  angular
    .module('app.network.package.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.package.list', {
        url: '?q',
        title: 'Packages',
        controller: 'PackageIndexCtrl as vm',
        templateUrl: helper.basepath('network/package/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
