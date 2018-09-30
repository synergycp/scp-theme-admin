(function () {
  'use strict';

  angular
    .module('app.network.switch.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.switch.list', {
        url: '?q',
        title: 'Switches',
        controller: 'SwitchIndexCtrl as vm',
        templateUrl: helper.basepath('network/switch/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
