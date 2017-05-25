(function () {
  angular
    .module('app.pxe.dhcp')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.dhcp', {
        url: '/dhcp',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.dhcp.view', {
        url: '/:id',
        title: 'View PXE DHCP Server',
        controller: 'PxeServerViewCtrl as vm',
        templateUrl: helper.basepath('pxe/dhcp/view/pxe-server.view.html'),
      })
      ;

    helper.url.map('pxe/dhcp/?([0-9]*)', function ($state, id) {
      return 'pxe/dhcp'+(id && '/'+id);
    });
  }
})();
