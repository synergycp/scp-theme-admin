(function () {
  angular
    .module('app.pxe.install')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.install', {
        url: '/install',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.install.list', {
        url: '',
        title: 'PXE Installs',
        controller: 'InstallIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/install/install.index.html'),
        resolve: helper.resolveFor('lang:os-reload'),
      })
      ;
  }
})();
