(function () {
  angular
    .module('app.pxe.file.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.file.list', {
        url: '?q',
        title: 'File Servers',
        controller: 'PxeFileIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/file/list/list.index.html'),
        reloadOnSearch: false,
        resolve: helper.resolveFor(
          'moment'
        )
      })
      ;
  }
})();
