(function () {
  'use strict';

  angular
    .module('app.hardware.server.provision')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.server.provision', {
        url: '/provision?client.id&server.id',
        title: 'Provision Server',
        controller: 'ServerProvisionCtrl as vm',
        templateUrl: helper.basepath('hardware/server/provision/provision.html'),
        resolve: helper.resolveFor(
          'moment', 'after:date-range-picker'
        ),
      })
      ;
  }
})();
