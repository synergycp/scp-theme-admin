(function () {
  angular
    .module('app.pxe.iso.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.iso.list', {
        url: '?q',
        title: 'ISO Manager',
        controller: 'IsoIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/iso/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
