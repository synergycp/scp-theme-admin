(function () {
  'use strict';

  angular
    .module('app.network.package.list')
    .component('packageTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showSwitchId: '=?',
        showIp: '=?',
        showPortCount: '=?',
        showScanStatus: '=?',
        showActions: '=?',
      },
      controller: 'PackageTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/package/list/list.table.html'
    })
    .controller('PackageTableCtrl', PackageTableCtrl)
    ;

  /**
   * @ngInject
   */
  function PackageTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showSwitchId: true,
        showIp: true,
        showPortCount: true,
        showScanStatus: true,
        showActions: true,
      });
    }
  }
})();
