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
        templateUrl: helper.basepath('auth/page.html'),
        resolve: helper.resolveFor('icons', 'lang:auth'),
      })
      .state('auth.login', {
        url: '/login',
        title: 'Login',
        templateUrl: helper.basepath('auth/login.html')
      })
      .state('auth.logout', {
        url: '/logout',
        title: 'Logout',
        template: '',
        controller: 'LogoutCtrl'
      })
      .state('auth.recover', {
        url: '/recover',
        title: 'Recover',
        templateUrl: helper.basepath('auth/recover.html')
      })
      ;
  }
})();
