(function () {
  'use strict';

  angular
    .module('app.hardware.server.bandwidth')
    .component('serverBandwidthPanel', {
      bindings: {
        server: '=',
        filter: '=?',
      },
      controller: 'ServerBandwidthPanelCtrl as panel',
      templateUrl: 'app/hardware/server/bandwidth/bandwidth.panel.html'
    })
    ;
})();
