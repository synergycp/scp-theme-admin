(function () {
  angular
    .module('app.system.integration')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.integration', {
        url: '/integration',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.integration.view', {
        abstract: true,
        url: '/:id',
        template: helper.dummyTemplate,
      })
      .state('app.system.integration.view.edit', {
        url: '',
        title: 'Edit Integration',
        controller: 'IntegrationViewCtrl as vm',
        templateUrl: helper.basepath('system/integration/integration.view.html'),
      })
      .state('app.system.integration.view.permissions', {
        url: '/permissions',
        title: 'Integration Permissions',
        controller: 'IntegrationPermissionsCtrl as vm',
        templateUrl: helper.basepath('system/integration/integration.permissions.html'),
      })
      ;

    helper.url.map('integration/?([0-9]*)', function ($state, id) {
      return 'system/integration'+(id && '/'+id);
    });
  }
})();
