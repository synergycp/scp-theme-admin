(function () {
  angular.module('app.user.client')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.client', {
        url: '/client',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.user.client.list', {
        url: '',
        title: 'Clients',
        templateUrl: helper.basepath('user/client/client.index.html'),
        controller: 'ClientIndexCtrl as vm'
      })
      .state('app.user.client.view', {
        url: '/:id',
        title: 'View Client',
        controller: 'ClientViewCtrl as vm',
        templateUrl: helper.basepath('user/client/client.view.html'),
      })
      ;
  }
})();
