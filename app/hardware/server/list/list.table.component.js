(function () {
  'use strict';

  angular
    .module('app.hardware.server.list')
    .component('serverTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showSrvId: '=?',
        showNickname: '=?',
        showIp: '=?',
        showClient: '=?',
        showStatus: '=?',
        showCpu: '=?',
        showRam: '=?',
        showHdds: '=?',
        showSwitch: '=?',
        showGroup: '=?',
        showUsageMax: '=?',
        showUsagePercent: '=?',
      },
      controller: 'ServerTableCtrl as table',
      transclude: true,
      templateUrl: 'app/hardware/server/list/list.table.html'
    })
    .controller('ServerTableCtrl', ServerTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showSrvId: true,
        showNickname: true,
        showIp: true,
        showClient: true,
        showStatus: true,
        showCpu: true,
        showRam: false,
        showHdds: false,
        showSwitch: true,
        showGroup: true,
        showUsageMax: true,
        showUsagePercent: true,
      });
    }
  }
})();
