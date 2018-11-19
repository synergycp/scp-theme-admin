(function () {
  angular
    .module('app.system')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system', {
        url: '/system',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:system'),
      })
      ;
  }
})();
