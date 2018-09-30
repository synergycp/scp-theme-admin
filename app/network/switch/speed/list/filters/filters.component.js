(function () {
  'use strict';

  angular
    .module('app.network.switch.speed.list.filters')
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
      templateUrl: 'app/network/switch/speed/list/filters/filters.html'
    })
    ;
})();
