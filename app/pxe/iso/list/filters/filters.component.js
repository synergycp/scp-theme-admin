(function () {
  'use strict';

  angular
    .module('app.pxe.iso.list.filters')
    .component('isoFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'IsoFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/iso/list/filters/filters.html'
    })
    ;
})();
