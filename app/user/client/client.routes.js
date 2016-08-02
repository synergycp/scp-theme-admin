(function () {
  angular.module('app.user.client')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.users.clients', {
        url: '/clients',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.users.clients.list', {
        url: '',
        title: 'Clients',
        templateUrl: helper.basepath('user/client/client.index.html'),
        controller: 'ClientIndexCtrl as vm'
      })
      .state('app.users.clients.view', {
        url: '/:id',
        title: 'View Client',
        controller: 'ClientViewCtrl as vm',
        templateUrl: helper.basepath('user/client/client.view.html'),
      })
      ;
  }
})();
