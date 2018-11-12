(function () {
  angular
    .module('app.system.theme')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.theme', {
        url: '/theme',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.theme.home', {
        url: '?tab',
        title: 'Theme Configuration',
        controller: 'ThemeIndexCtrl as vm',
        templateUrl: helper.basepath('system/theme/theme.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
