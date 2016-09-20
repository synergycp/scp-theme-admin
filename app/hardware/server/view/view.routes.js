(function () {
  'use strict';

  angular
    .module('app.hardware.server.view')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
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
        templateUrl: helper.basepath('hardware/server/view/view.edit.html'),
        resolve: helper.resolveFor(
          'moment', 'after:date-range-picker'
        ),
      })
      ;
  }
})();
