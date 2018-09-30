(function () {
  'use strict';

  angular
    .module('app.system.integration.list.filters')
    .component('integrationFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'IntegrationFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/system/integration/list/filters/filters.html'
    })
    ;
})();
