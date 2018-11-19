(function () {
  'use strict';

  angular
    .module('app.pxe.preseed.list.filters')
    .component('preseedFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'PreseedFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/preseed/list/filters/filters.html'
    })
    ;
})();
