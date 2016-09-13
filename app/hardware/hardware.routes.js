(function () {
  angular
    .module('app.hardware')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware', {
        url: '/hardware',
        abstract: true,
        template: helper.dummyTemplate,
      })
      ;
  }
})();
