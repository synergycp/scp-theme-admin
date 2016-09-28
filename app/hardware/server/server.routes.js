(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider, SsoUrlProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.server', {
        url: '/server',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:server'),
      })
      ;

    helper.url('server/?([0-9]*)', mapServerUrl);
    SsoUrlProvider.map('server', function (options) {
      return mapServerUrl(options.id);
    });

    function mapServerUrl (id) {
      return 'hardware/server'+(id && '/'+id);
    }
  }
})();
