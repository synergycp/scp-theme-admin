(function () {
  'use strict';

  angular
    .module('app.user.key.list.filters')
    .component('apiKeyFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'ApiKeyFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/user/key/list/filters/filters.html'
    })
    ;
})();
