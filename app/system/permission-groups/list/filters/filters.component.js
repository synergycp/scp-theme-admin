(function () {
  'use strict';

  angular
    .module('app.system.permission-groups.list.filters')
    .component('permissionGroupsFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'PermissionGroupsFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/system/permission-groups/list/filters/filters.html'
    })
    ;
})();
