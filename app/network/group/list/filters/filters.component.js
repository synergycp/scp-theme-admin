(function () {
  'use strict';

  angular
    .module('app.network.group.list.filters')
    .component('groupFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'GroupFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/network/group/list/filters/filters.html'
    })
    ;
})();
