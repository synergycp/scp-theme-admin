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
        resolve: helper.resolveFor('lang:server'),
      })
      .state('app.hardware.server.inventory', {
        url: '/inventory?switch&group',
        title: 'Server Inventory',
        controller: 'ServerInventoryCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.inventory.html'),
      })
      .state('app.hardware.server.list', {
        url: '?switch&group&client',
        title: 'Servers',
        controller: 'ServerIndexCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.index.html'),
      })
      .state('app.hardware.server.provision', {
        url: '/provision?client',
        title: 'Provision Server',
        controller: 'ServerProvisionCtrl as vm',
        templateUrl: helper.basepath('hardware/server/provision/provision.html'),
      })
      .state('app.hardware.server.view', {
        url: '/:id',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:pxe', 'lang:bandwidth'),
      })
      .state('app.hardware.server.view.edit', {
        url: '/edit',
        title: 'Edit Server',
        controller: 'ServerEditCtrl as vm',
        templateUrl: helper.basepath('hardware/server/server.edit.html'),
      })
      .state('app.hardware.server.view.manage', {
        url: '?bandwidth.start&bandwidth.end',
        title: 'Manage Server',
        reloadOnSearch: false,
        controller: 'ServerManageCtrl as vm',
        templateUrl: helper.basepath('hardware/server/manage/manage.html'),
        resolve: helper.resolveFor(
          'chart-js', 'after:ng-chart-js',
          'moment', 'after:date-range-picker',
          'numeral'
        ),
      })
      ;
  }
})();
