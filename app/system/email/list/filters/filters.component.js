(function () {
  'use strict';

  angular
    .module('app.system.email.list.filters')
    .component('emailFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'EmailFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/system/email/list/filters/filters.html'
    })
    ;
})();
