(function () {
  'use strict';

  angular
    .module('app.hardware.switch.speed')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.switch.speed', {
        url: '/speed',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:speed'),
      })
      .state('app.hardware.switch.speed.list', {
        url: '',
        title: 'Switch Speeds',
        controller: 'SpeedListCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/speed/speed.index.html'),
      })
      .state('app.hardware.switch.speed.view', {
        url: '/:id',
        title: 'View Switch Speed',
        controller: 'SpeedViewCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/speed/speed.view.html'),
      })
      ;
  }
})();
