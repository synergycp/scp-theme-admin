(function () {
  'use strict';

  angular
    .module('app.hardware.switch.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.switch.list', {
        url: '?q',
        title: 'Switches',
        controller: 'SwitchIndexCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
