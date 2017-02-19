(function () {
  'use strict';

  var DIR = 'hardware/server/list/';

  angular
    .module('app.hardware.server.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.server.inventory', {
        url: '/inventory?switch&group&q',
        title: 'Server Inventory',
        controller: 'ServerInventoryCtrl as vm',
        templateUrl: helper.basepath(DIR+'list.inventory.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'moment', 'after:date-range-picker'
        ),
      })
      .state('app.hardware.server.list', {
        url: '?switch&group&disks&cpu&mem&client&bw_min&bw_max&q',
        title: 'Servers',
        controller: 'ServerIndexCtrl as vm',
        templateUrl: helper.basepath(DIR+'list.index.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'moment', 'after:date-range-picker'
        ),
      })
      ;
  }
})();
