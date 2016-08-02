(function () {
  'use strict';

  angular
    .module('app.hardware.switch')
    .component('switchTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showSwitchId: '=?',
        showIp: '=?',
        showServerCount: '=?',
        showActions: '=?',
      },
      controller: 'SwitchTableCtrl as table',
      transclude: true,
      templateUrl: 'app/hardware/switch/switch.table.html'
    })
    .controller('SwitchTableCtrl', SwitchTableCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchTableCtrl() {
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
