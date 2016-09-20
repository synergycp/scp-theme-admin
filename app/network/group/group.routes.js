(function () {
  angular
    .module('app.network.group')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.group', {
        url: '/group',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:group'),
      })
      .state('app.network.group.view', {
        url: '/:id',
        title: 'View Group',
        controller: 'GroupViewCtrl as vm',
        templateUrl: helper.basepath('network/group/group.view.html'),
      })
      ;
  }
})();
