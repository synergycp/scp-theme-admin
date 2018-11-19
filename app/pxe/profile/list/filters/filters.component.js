(function () {
  'use strict';

  angular
    .module('app.pxe.profile.list.filters')
    .component('profileFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'ProfileFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/pxe/profile/list/filters/filters.html'
    })
    ;
})();
