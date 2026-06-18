(function () {
  angular
    .module('app.user.console')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.console', {
        url: '/console',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:console'),
      })
      .state('app.user.console.list', {
        url: '?q',
        title: 'Manage Consoles',
        controller: 'UserConsoleSessionIndexCtrl as vm',
        reloadOnSearch: false,
        templateUrl: helper.basepath('user/console/list.index.html'),
      })
      ;
  }
})();
