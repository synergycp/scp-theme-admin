(function () {
  angular
    .module('app.user.client')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client', {
        url: '/client',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:client'),
      })
      ;
  }
})();
