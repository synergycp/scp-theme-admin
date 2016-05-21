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
        template: helper.dummyTemplate
      })
      .state('app.users.clients', {
        url: '/clients',
        abstract: true,
        template: helper.dummyTemplate
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
        templateUrl: helper.basepath('user/client.view.html'),
        controller: 'ClientViewCtrl as vm'
      })
      .state('app.users.admins', {
        url: '/admins',
        title: 'Administrators',
        controller: 'AdminListCtrl as vm',
        templateUrl: helper.basepath('user/admin.index.html')
      });
  }
})();
