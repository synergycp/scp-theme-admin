(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.users', {
        url: '/users',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:user'),
      })
      ;
  }
})();
