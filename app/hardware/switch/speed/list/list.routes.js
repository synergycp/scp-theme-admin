(function () {
  'use strict';

  angular
    .module('app.hardware.switch.speed.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.switch.speed.list', {
        url: '?q',
        title: 'Switch Speeds',
        controller: 'SwitchSpeedIndexCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/speed/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
