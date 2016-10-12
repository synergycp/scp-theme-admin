(function () {
  'use strict';

  angular
    .module('app.network.switch.speed.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.switch.speed.list', {
        url: '?q',
        title: 'Switch Speeds',
        controller: 'SwitchSpeedIndexCtrl as vm',
        templateUrl: helper.basepath('network/switch/speed/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
