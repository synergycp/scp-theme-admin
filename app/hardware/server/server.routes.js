(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.server', {
        url: '/server',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:server', 'moment')
      })
      ;

    helper.url.map('(?<!console)/server/?([0-9]*)', function ($state, id) {
      return id ? 'hardware/server/' + id + '/edit' : 'hardware/server';
    });
    helper.sso.map('server', function ($state, options) {
      return $state.href(
        'app.hardware.server.' + (options.id ? 'view' : 'list'),
        { id: options.id }
      );
    });
  }
})();
