(function () {
  'use strict';

  angular
    .module('app.system.package')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.package', {
        url: '/packages',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:package'),
      })
      ;

    helper.url.map('packages/?([0-9]*)', function ($state, id) {
      return 'system/packages'+(id && '/'+id);
    });
  }
})();
