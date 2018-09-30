(function () {
  angular
    .module('app.pxe.shell.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.shell.list', {
        url: '?q',
        title: 'Shell Scripts',
        controller: 'ShellIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/shell/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
