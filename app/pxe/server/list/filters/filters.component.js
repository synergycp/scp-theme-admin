(function () {
  'use strict';

  angular
    .module('app.pxe.server.list.filters')
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
      templateUrl: 'app/pxe/server/list/filters/filters.html'
    })
    ;
})();
