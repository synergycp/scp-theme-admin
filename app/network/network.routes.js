(function () {
  angular.module('app.core.routes')
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
      })
      .state('app.network.entity', {
        url: '/entity',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.network.entity.list', {
        url: '?group&server',
        title: 'Entities',
        controller: 'EntityListCtrl as vm',
        templateUrl: helper.basepath('network/entity/entity.index.html'),
      })
      .state('app.network.entity.view', {
        url: '/:id',
        title: 'View Entity',
        controller: 'EntityViewCtrl as vm',
        templateUrl: helper.basepath('network/entity/entity.view.html'),
      })
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
