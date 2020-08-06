(function () {
  'use strict';

  angular
    .module('app.network.pool.list.filters')
    .component('poolFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
        shouldWatchMainSearch: '=?'
      },
      controller: 'PoolFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/network/pool/list/filters/filters.html'
    })
    ;
})();
