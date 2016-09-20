(function () {
  'use strict';

  angular
    .module('app.user.client.list.filters')
    .component('clientFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'ClientFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/user/client/list/filters/filters.html'
    })
    ;
})();
