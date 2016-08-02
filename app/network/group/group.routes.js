(function () {
  angular.module('app.network.group')
    .config(routeConfig);

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
      })
      .state('app.network.group.list', {
        url: '',
        title: 'Groups',
        controller: 'GroupListCtrl as vm',
        templateUrl: helper.basepath('network/group/group.index.html'),
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
