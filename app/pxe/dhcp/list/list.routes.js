(function () {
  angular
    .module('app.pxe.dhcp.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.dhcp.list', {
        url: '?q',
        title: 'DHCP Servers',
        controller: 'PxeDhcpIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/dhcp/list/list.index.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'moment'
        )
      })
      ;
  }
})();
