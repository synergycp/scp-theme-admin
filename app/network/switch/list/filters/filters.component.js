(function () {
  'use strict';

  angular
    .module('app.network.switch.list.filters')
    .component('switchFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
        shouldWatchMainSearch: '=?'
      },
      controller: 'SwitchFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/network/switch/list/filters/filters.html'
    })
    ;
})();
