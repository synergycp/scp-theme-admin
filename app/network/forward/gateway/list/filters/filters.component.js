(function () {
  'use strict';

  angular
    .module('app.network.forward.gateway.list.filters')
    .component('forwardGatewayFilters', {
      require: {
        list: '\^list',
      },
      bindings: {
        show: '<',
        current: '=',
        change: '&?',
        shouldWatchMainSearch: '=?'
      },
      controller: 'ForwardGatewayFiltersCtrl as filters',
      transclude: true,
      templateUrl: 'app/network/forward/gateway/list/filters/filters.html'
    })
    ;
})();
