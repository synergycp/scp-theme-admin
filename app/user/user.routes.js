(function () {
  angular
    .module('app.user')
    .config(routeConfig)
    ;

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
      })
      ;
  }
})();
