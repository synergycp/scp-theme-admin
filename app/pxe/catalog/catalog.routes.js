(function () {
  'use strict';

  angular
    .module('app.pxe.catalog')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.catalog', {
        url: '/catalog',
        abstract: true,
        template: helper.dummyTemplate,
      });
  }
})();
