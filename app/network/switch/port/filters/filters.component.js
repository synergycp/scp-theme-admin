(function () {
  'use strict';

  angular
    .module('app.network.switch.port.filters')
    .component('switchPortFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?'
      },
      controller: 'SwitchPortFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/network/switch/port/filters/filters.html'
    })
    ;
})();
