(function () {
  'use strict';

  angular
    .module('app.pxe.boot.list.filters')
    .component('bootScriptFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'BootScriptFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/boot/list/filters/filters.html'
    })
    ;
})();
