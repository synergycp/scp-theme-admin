(function () {
  'use strict';

  angular
    .module('app.bandwidth')
    .component('bandwidthGraph', {
      require: {
      },
      bindings: {
        target: '=',
        filter: '=',
        state: '=',
        chart: '=',
      },
      controller: 'BandwidthGraphCtrl as bandwidth',
      transclude: true,
      templateUrl: 'app/bandwidth/bandwidth.graph.html'
    })
    ;
})();
