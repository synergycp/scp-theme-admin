(function () {
  'use strict';

  angular
    .module('app.network.package')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.package', {
        url: '/package',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:package'),
      })
      ;

    helper.url.map('package/?([0-9]*)', function ($state, id) {
      return 'network/package'+(id && '/'+id);
    });
  }
})();
