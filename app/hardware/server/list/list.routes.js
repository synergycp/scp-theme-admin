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
    var search = '?switch&group&disks[]&cpu&mem&client&bw.min&bw.max&billing.id&billing.integration&q';
    $stateProvider
      .state('app.hardware.server.inventory', {
        url: '/inventory'+search,
        title: 'Server Inventory',
        controller: 'ServerInventoryCtrl as vm',
        templateUrl: helper.basepath(DIR+'list.inventory.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'moment', 'after:date-range-picker'
        ),
      })
      .state('app.hardware.server.list', {
        url: search,
        title: 'Servers',
        controller: 'ServerIndexCtrl as vm',
        templateUrl: helper.basepath(DIR+'list.index.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'moment', 'after:date-range-picker',
          'numeral'
        ),
      })
      ;
  }
})();
