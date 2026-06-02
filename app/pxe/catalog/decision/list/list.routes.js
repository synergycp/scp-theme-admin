(function () {
  'use strict';

  angular
    .module('app.pxe.catalog.decision.list')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.catalog.decision.list', {
        url: '?q',
        title: 'Discarded Templates',
        controller: 'CatalogDecisionIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/catalog/decision/list/list.index.html'),
        reloadOnSearch: false,
      });
  }
})();
