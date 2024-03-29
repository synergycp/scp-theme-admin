(function () {
  angular
    .module('app.user.admin')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.admin', {
        url: '/admin',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:admin'),
      })
      .state('app.user.admin.view', {
        abstract: true,
        url: '/:id',
        template: helper.dummyTemplate,
      })
      .state('app.user.admin.view.edit', {
        url: '',
        title: 'Edit Administrator',
        controller: 'AdminViewCtrl as vm',
        templateUrl: helper.basepath('user/admin/admin.view.html'),
      })
      ;

    helper.url.map('admin/?([0-9]*)', function ($state, id) {
      return 'user/admin'+(id && '/'+id);
    });
  }
})();
