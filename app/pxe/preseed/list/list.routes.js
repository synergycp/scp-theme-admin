(function () {
  angular
    .module('app.pxe.preseed.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.preseed.list', {
        url: '?q',
        title: 'Preseeds',
        controller: 'PreseedIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/preseed/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
