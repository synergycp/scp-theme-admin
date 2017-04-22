(function () {
  'use strict';

  angular
    .module('app.hardware.server.list.filters')
    .component('serverFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
        shouldWatchMainSearch: '=?'
      },
      controller: 'ServerFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/hardware/server/list/filters/filters.html'
    })
    ;
})();
