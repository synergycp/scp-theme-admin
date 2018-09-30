(function () {
  angular
    .module('app.system.integration.key')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.integration.view.key', {
        abstract: true,
        url: '/key',
        title: 'Integration API Keys',
        template: helper.dummyTemplate,
      })
      .state('app.system.integration.view.key.list', {
        url: '',
        title: 'Integration API Keys',
        controller: 'IntegrationKeyListCtrl as vm',
        templateUrl: helper.basepath('system/integration/key/key.list.html'),
      })
      .state('app.system.integration.view.key.view', {
        url: '/:key',
        title: 'Integration API Key',
        controller: 'IntegrationKeyViewCtrl as vm',
        templateUrl: helper.basepath('system/integration/key/key.view.html'),
      })
      ;
  }
})();
