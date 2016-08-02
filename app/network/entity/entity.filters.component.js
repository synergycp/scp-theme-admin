(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .component('entityFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '=',
        current: '=',
        change: '&?',
      },
      controller: 'EntityFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/network/entity/entity.filters.html'
    })
    ;
})();
