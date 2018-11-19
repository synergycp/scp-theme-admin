(function () {
  angular
    .module('app.dashboard')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, $urlRouterProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    // default URL is dashboard
    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider
      .state('app.dashboard', {
        url: '/dashboard',
        title: 'Dashboard',
        controller: 'DashboardCtrl as dash',
        templateUrl: helper.basepath('dashboard/dashboard.html'),
        resolve: helper.resolveFor(
          'lang:dashboard', 'lang:bandwidth',
          'chart-js', 'after:ng-chart-js',
          'moment', 'after:date-range-picker',
          'numeral'
        ),
      });
  }
})();
