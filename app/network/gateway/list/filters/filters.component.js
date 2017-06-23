(function () {
  'use strict';

  angular
    .module('app.network.gateway.list.filters')
    .component('gatewayFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
      },
      controller: 'GatewayFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/network/gateway/list/filters/filters.html'
    })
    ;
})();
