(function () {
  'use strict';

  angular
    .module('app.system.log.list.filters')
    .component('logFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'LogFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/system/log/list/filters/filters.html'
    })
    ;
})();
