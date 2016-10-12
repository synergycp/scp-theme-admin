(function () {
  'use strict';

  angular
    .module('app.network.switch.scan')
    .component('switchScanTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showStarted: '=?',
        showStatus: '=?',
        showActions: '=?',
      },
      controller: 'SwitchScanTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/switch/scan/scan.table.html'
    })
    .controller('SwitchScanTableCtrl', SwitchScanTableCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchScanTableCtrl() {
    var table = this;

    table.$onInit = init;
    table.startScan = startScan;

    ///////////

    function init() {
      _.defaults(table, {
        showStarted: true,
        showStatus: true,
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
