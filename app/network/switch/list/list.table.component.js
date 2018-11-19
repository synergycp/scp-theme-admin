(function () {
  'use strict';

  angular
    .module('app.network.switch.list')
    .component('switchTable', {
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
      controller: 'SwitchTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/switch/list/list.table.html'
    })
    .controller('SwitchTableCtrl', SwitchTableCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchTableCtrl() {
    var table = this;

    table.$onInit = init;
    table.startScan = startScan;

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

    function startScan($item) {
      return table.list.list.loader.during(
        $item
          .all('scan')
          .post()
          .then(table.list.list.load)
          // TODO: refresh logs
      );
    }
  }
})();
