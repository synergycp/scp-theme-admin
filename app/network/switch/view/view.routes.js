(function () {
  'use strict';

  angular
    .module('app.network.switch.view')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.switch.view', {
        url: '/:id',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:bandwidth'),
      })
      .state('app.network.switch.view.edit', {
        url: '/edit',
        title: 'Edit Switch',
        controller: 'SwitchEditCtrl as vm',
        templateUrl: helper.basepath('network/switch/view/view.edit.html'),
      })
      ;
  }
})();
