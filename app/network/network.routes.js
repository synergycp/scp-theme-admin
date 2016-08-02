(function () {
  angular.module('app.network')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network', {
        url: '/network',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:network'),
      })
      ;
  }
})();
