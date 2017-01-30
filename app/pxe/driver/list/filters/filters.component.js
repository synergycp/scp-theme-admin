(function () {
  'use strict';

  angular
    .module('app.pxe.driver.list.filters')
    .component('pxeDriverFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'PxeDriverFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/driver/list/filters/filters.html'
    })
    ;
})();
