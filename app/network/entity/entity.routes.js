(function () {
  angular
    .module('app.network.entity')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.entity', {
        url: '/entity',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:entity'),
      })
      .state('app.network.entity.view', {
        url: '/:id',
        title: 'View Entity',
        controller: 'EntityViewCtrl as vm',
        templateUrl: helper.basepath('network/entity/entity.view.html'),
      })
      ;
  }
})();
