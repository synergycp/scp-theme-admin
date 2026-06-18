(function () {
  angular
    .module('app.hardware.console')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.console', {
        url: '/console',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:console'),
      })
      .state('app.hardware.console.list', {
        url: '?q',
        title: 'Manage Consoles',
        controller: 'HardwareConsoleSessionIndexCtrl as vm',
        reloadOnSearch: false,
        templateUrl: helper.basepath('hardware/console/list.index.html'),
      })
      ;
  }
})();
