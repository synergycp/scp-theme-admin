(function () {
  angular
    .module('app.system.log.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.log.list', {
        url: '?q',
        title: 'Logs',
        controller: 'LogIndexCtrl as vm',
        templateUrl: helper.basepath('system/log/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
