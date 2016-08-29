(function () {
  angular
    .module('app.core.routes')
    .config(routeConfig)
    .factory('checkLoginMiddleware', checkLoginMiddleware)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, $locationProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    // Set the following to true to enable the HTML5 Mode
    // You may have to set <base> tag in index and a routing configuration in your server
    $locationProvider.html5Mode(false);

    $stateProvider
      .state('app', {
        url: '',
        abstract: true,
        templateUrl: helper.basepath('core/app.html'),
        resolve: helper.resolveFor(
          'inject:checkLoginMiddleware',
          'modernizr', 'icons',
          'lang:app', 'lang:nav'
        ),
      });
  }

  /**
   * @ngInject
   */
  function checkLoginMiddleware(ApiKey, Auth) {
    return function () {
      if (!ApiKey.id()) {
        Auth.logout();

        throw new Error('Not logged in');
      }
    };
  }
})();
