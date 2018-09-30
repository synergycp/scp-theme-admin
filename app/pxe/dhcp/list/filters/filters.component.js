(function () {
  'use strict';

  angular
    .module('app.pxe.dhcp.list.filters')
    .component('pxeDhcpFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'PxeDhcpFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/dhcp/list/filters/filters.html'
    })
    ;
})();
