(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe', {
        url: '/pxe',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.install', {
        url: '/install',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.install.list', {
        url: '',
        title: 'PXE Installs',
        //controller: 'ClientListCtrl as vm',
        templateUrl: helper.basepath('pxe/install.index.html'),
      })
      .state('app.pxe.preseed', {
        url: '/preseed',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.preseed.list', {
        url: '',
        title: 'Preseeds',
        controller: 'PreseedListCtrl as vm',
        templateUrl: helper.basepath('pxe/preseed.index.html'),
      })
      .state('app.pxe.preseed.view', {
        url: '/:id',
        title: 'View Preseed',
        controller: 'PreseedViewCtrl as vm',
        templateUrl: helper.basepath('pxe/preseed.view.html'),
      })
      .state('app.pxe.shell', {
        url: '/shell',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.shell.list', {
        url: '',
        title: 'Shell Scripts',
        controller: 'ShellListCtrl as vm',
        templateUrl: helper.basepath('pxe/shell.index.html'),
      })
      .state('app.pxe.shell.view', {
        url: '/:id',
        title: 'View Shell Script',
        controller: 'ShellViewCtrl as vm',
        templateUrl: helper.basepath('pxe/shell.view.html'),
      })
      ;
  }
})();
