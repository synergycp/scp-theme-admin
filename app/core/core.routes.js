(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

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
          'modernizr', 'icons',
          'lang:app', 'lang:nav'
        ),
      });
  }
})();
