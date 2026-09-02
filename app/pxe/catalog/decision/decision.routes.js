(function () {
  'use strict';

  angular
    .module('app.pxe.catalog.decision')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.catalog.decision', {
        url: '/decision',
        abstract: true,
        template: helper.dummyTemplate,
      });
  }
})();
