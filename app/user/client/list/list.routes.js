(function () {
  angular
    .module('app.user.client.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client.list', {
        url: '?q',
        title: 'Clients',
        controller: 'ClientIndexCtrl as vm',
        templateUrl: helper.basepath('user/client/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
