(function () {
  'use strict';

  angular
    .module('app.pxe.file.list.filters')
    .component('pxeFileFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'PxeFileFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/file/list/filters/filters.html'
    })
    ;
})();
