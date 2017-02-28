(function () {
  angular
    .module('app.pxe.server.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.server.list', {
        url: '?q',
        title: 'Profiles',
        controller: 'PxeServerIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/server/list/list.index.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'moment'
        )
      })
      ;
  }
})();
