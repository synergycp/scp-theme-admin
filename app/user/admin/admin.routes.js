(function () {
  angular.module('app.user.admin')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.users.admins', {
        url: '/admins',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.users.admins.list', {
        url: '',
        title: 'Administrators',
        controller: 'AdminListCtrl as vm',
        templateUrl: helper.basepath('user/admin/admin.index.html'),
      })
      .state('app.users.admins.view', {
        url: '/:id',
        title: 'View Administrator',
        controller: 'AdminViewCtrl as vm',
        templateUrl: helper.basepath('user/admin/admin.view.html'),
      })
      ;
  }
})();
