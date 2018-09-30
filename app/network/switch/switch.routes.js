(function () {
  'use strict';

  angular
    .module('app.network.switch')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.switch', {
        url: '/switch',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:switch'),
      })
      ;

    helper.url.map('switch/?([0-9]*)', function ($state, id) {
      return 'network/switch'+(id && '/'+id);
    });
  }
})();
