(function () {
  'use strict';

  angular
    .module('app.hardware.switch')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.switch', {
        url: '/switch',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:switch'),
      })
      ;
  }
})();
