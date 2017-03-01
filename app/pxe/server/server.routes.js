(function () {
  angular
    .module('app.pxe.server')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.server', {
        url: '/server',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.server.view', {
        url: '/:id',
        title: 'View PXE Server',
        controller: 'PxeServerViewCtrl as vm',
        templateUrl: helper.basepath('pxe/server/view/pxe-server.view.html'),
      })
      ;

    helper.url.map('pxe/server/?([0-9]*)', function ($state, id) {
      return 'pxe/server'+(id && '/'+id);
    });
  }
})();
