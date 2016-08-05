(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user', {
        url: '/user',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:user'),
      })
      ;
  }
})();
