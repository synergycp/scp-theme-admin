(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.users', {
        url: '/users',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.users.clients', {
        url: '/clients',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.users.clients.list', {
        url: '',
        title: 'Clients',
        templateUrl: helper.basepath('user/client.index.html'),
        controller: 'ClientListCtrl as vm'
      })
      .state('app.users.clients.view', {
        url: '/:id',
        title: 'View Client',
        controller: 'ClientViewCtrl as vm',
        templateUrl: helper.basepath('user/client.view.html'),
      })
      .state('app.users.admins', {
        url: '/admins',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.users.admins.list', {
        url: '',
        title: 'Administrators',
        controller: 'AdminListCtrl as vm',
        templateUrl: helper.basepath('user/admin.index.html'),
      })
      .state('app.users.admins.view', {
        url: '/:id',
        title: 'View Administrator',
        controller: 'AdminViewCtrl as vm',
        templateUrl: helper.basepath('user/admin.view.html'),
      })
      ;
  }
})();
