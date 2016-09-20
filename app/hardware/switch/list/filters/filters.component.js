(function () {
  'use strict';

  angular
    .module('app.hardware.switch.list.filters')
    .component('switchFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'SwitchFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/hardware/switch/list/filters/filters.html'
    })
    ;
})();
