(function () {
  'use strict';

  angular
    .module('app.pxe.catalog.decision.view')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.catalog.decision.view', {
        url: '/:id',
        title: 'View Discarded Template',
        controller: 'CatalogDecisionViewCtrl as vm',
        templateUrl: helper.basepath('pxe/catalog/decision/view/view.html'),
        resolve: helper.resolveFor('codemirror', 'after:mergely'),
      });
  }
})();
