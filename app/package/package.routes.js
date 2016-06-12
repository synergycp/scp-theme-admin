(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pkg', {
        url: '/pkg',
        abstract: true,
        template: helper.dummyTemplate,
      })
      ;
  }
})();
