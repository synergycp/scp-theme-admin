(function () {
  angular
    .module('app.system.log')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.log', {
        url: '/log',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:log'),
      })
      .state('app.system.log.view', {
        url: '/:id',
        title: 'View Log',
        controller: 'LogViewCtrl as vm',
        templateUrl: helper.basepath('system/log/log.view.html'),
      })
      ;
  }
})();
