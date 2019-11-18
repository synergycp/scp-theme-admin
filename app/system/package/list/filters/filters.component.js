(function () {
  'use strict';

  angular
    .module('app.system.package.list.filters')
    .component('packageFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'PackageFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/system/package/list/filters/filters.html'
    })
    ;
})();
