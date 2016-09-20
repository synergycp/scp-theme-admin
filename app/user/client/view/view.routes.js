(function () {
  angular
    .module('app.user.client.view')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client.view', {
        url: '/:id',
        title: 'View Client',
        controller: 'ClientViewCtrl as vm',
        templateUrl: helper.basepath('user/client/view/view.html'),
      })
      ;
  }
})();
