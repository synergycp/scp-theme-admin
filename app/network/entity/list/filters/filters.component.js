(function () {
  'use strict';

  angular
    .module('app.network.entity.list.filters')
    .component('entityFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'EntityFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/network/entity/list/filters/filters.html'
    })
    ;
})();
