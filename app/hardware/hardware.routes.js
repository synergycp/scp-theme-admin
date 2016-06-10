(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware', {
        url: '/hardware',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.server', {
        url: '/server',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.server.inventory', {
        url: '/inventory',
        title: 'Server Inventory',
        controller: 'ServerInventoryCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.inventory.html'),
      })
      .state('app.hardware.server.list', {
        url: '?switch&group&client',
        title: 'Servers',
        controller: 'ServerListCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.index.html'),
      })
      .state('app.hardware.server.view', {
        url: '/:id',
        title: 'View Server',
        controller: 'ServerViewCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.view.html'),
      })
      .state('app.hardware.switch', {
        url: '/switch',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.switch.list', {
        url: '',
        title: 'Switches',
        controller: 'SwitchListCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/switch.index.html'),
      })
      .state('app.hardware.switch.view', {
        url: '/:id',
        title: 'View Switch',
        controller: 'SwitchViewCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/switch.view.html'),
      })
      ;
  }
})();
