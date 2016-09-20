(function () {
  'use strict';

  angular
    .module('app.hardware.switch.view')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.switch.view', {
        url: '/:id',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:bandwidth'),
      })
      .state('app.hardware.switch.view.edit', {
        url: '/edit',
        title: 'Edit Switch',
        controller: 'SwitchEditCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/view/view.edit.html'),
      })
      ;
  }
})();
