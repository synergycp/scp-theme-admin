(function () {
  'use strict';

  angular
    .module('app.user.admin.list.filters')
    .component('adminFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'AdminFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/user/admin/list/filters/filters.html'
    })
    ;
})();
