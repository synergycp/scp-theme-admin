(function () {
  'use strict';

  angular
    .module('app.hardware.switch.speed.list')
    .component('switchSpeedTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showSwitchId: '=?',
        showIp: '=?',
        showServerCount: '=?',
        showActions: '=?',
      },
      controller: 'SwitchSpeedTableCtrl as table',
      transclude: true,
      templateUrl: 'app/hardware/switch/speed/list/list.table.html'
    })
    .controller('SwitchSpeedTableCtrl', SwitchSpeedTableCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchSpeedTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showSwitchId: true,
        showIp: true,
        showServerCount: true,
        showActions: true,
      });
    }
  }
})();
