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

    helper.url.map('server/?([0-9]*)', mapServerUrl);
    helper.sso.map('server', function ($state, options) {
      return mapServerUrl($state, options.id);
    });

    function mapServerUrl ($state, id) {
      var params = {
        id: id,
      };

      return $state.href(
        'app.hardware.server.' + (id ? 'view' : 'list'),
        params
      );
    }
  }
})();
