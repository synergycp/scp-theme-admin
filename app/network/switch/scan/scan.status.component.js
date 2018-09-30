(function () {
  'use strict';

  angular
    .module('app.network.switch.scan')
    .component('switchScanStatus', {
      require: {
      },
      bindings: {
        scan: '=',
      },
      controller: 'SwitchScanStatusCtrl as status',
      transclude: true,
      templateUrl: 'app/network/switch/scan/scan.status.html'
    })
    .controller('SwitchScanStatusCtrl', SwitchScanStatusCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchScanStatusCtrl() {
    var status = this;

    status.$onInit = init;

    //////////

    function init() {
    }
  }
})();
