(function () {
  angular
    .module('app.user.account.layout')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.account.layout', {
        url: '/layout',
        title: 'Theme Settings',
        templateUrl: helper.basepath('user/account/layout/layout.index.html'),
        controller: 'UserAccountLayoutIndexCtrl as vm',
      })
      ;
  }
})();
