(function () {
  angular
    .module('app.auth')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl: helper.basepath('auth/auth.page.html'),
        resolve: helper.resolveFor('icons', 'lang:auth'),
      })
      .state('auth.login', {
        url: '/login?next',
        title: 'Login',
        templateUrl: helper.basepath('auth/login/login.html'),
      })
      .state('auth.logout', {
        url: '/logout',
        title: 'Logout',
        template: '',
        controller: 'LogoutCtrl',
      })
      .state('auth.reset', {
        url: '/password-reset',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('auth.reset.forgot', {
        url: '',
        title: 'Recover Password',
        templateUrl: helper.basepath('auth/reset/reset.forgot.html'),
        controller: 'AuthResetForgotCtrl as forgot',
      })
      .state('auth.reset.view', {
        url: '/:id?token',
        title: 'Set Password',
        templateUrl: helper.basepath('auth/reset/reset.view.html'),
        controller: 'AuthResetViewCtrl as reset',
      })
      ;
  }
})();
