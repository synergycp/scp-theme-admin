(function () {
  'use strict';

  angular
    .module('app.pxe.dhcp.list.filters')
    .component('pxeServerFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'PxeServerFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/dhcp/list/filters/filters.html'
    })
    ;
})();
