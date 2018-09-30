(function () {
  'use strict';

  angular
    .module('app.network.switch.scan')
    .component('switchScans', {
      require: {
      },
      bindings: {
        switch: '=',
      },
      controller: 'SwitchScanListCtrl as scans',
      transclude: true,
      templateUrl: 'app/network/switch/scan/scan.list.html'
    })
    .controller('SwitchScanListCtrl', SwitchScanListCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchScanListCtrl(List) {
    var scans = this;

    scans.$onInit = init;

    //////////

    function init() {
      scans.list = List('switch/'+scans.switch.id+'/scan');
      scans.list.load();
    }
  }
})();
