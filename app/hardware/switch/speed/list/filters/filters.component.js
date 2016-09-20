(function () {
  'use strict';

  angular
    .module('app.hardware.switch.speed.list.filters')
    .component('switchSpeedFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'SwitchSpeedFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/hardware/switch/speed/list/filters/filters.html'
    })
    ;
})();
