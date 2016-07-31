(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

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
        resolve: helper.resolveFor('lang:hardware'),
      })
      .state('app.hardware.part', {
        url: '/part',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.part.list', {
        url: '?tab&search',
        title: 'Part Inventory',
        controller: 'PartIndexCtrl as vm',
        templateUrl: helper.basepath('hardware/part/part.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
