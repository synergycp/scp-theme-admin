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
        resolve: helper.resolveFor('lang:pxe'),
      })
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
      })
      .state('app.pxe.profile', {
        url: '/profile',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.profile.list', {
        url: '',
        title: 'Profiles',
        controller: 'ProfileListCtrl as vm',
        templateUrl: helper.basepath('pxe/profile/profile.index.html'),
      })
      .state('app.pxe.profile.view', {
        url: '/:id',
        title: 'View Profile',
        controller: 'ProfileViewCtrl as vm',
        templateUrl: helper.basepath('pxe/profile/profile.view.html'),
      })
      .state('app.pxe.preseed', {
        url: '/preseed',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.preseed.list', {
        url: '',
        title: 'Preseeds',
        controller: 'PreseedIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/preseed/preseed.index.html'),
      })
      .state('app.pxe.preseed.view', {
        url: '/:id',
        title: 'View Preseed',
        controller: 'PreseedViewCtrl as vm',
        templateUrl: helper.basepath('pxe/preseed/preseed.view.html'),
      })
      .state('app.pxe.iso', {
        url: '/iso',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.iso.list', {
        url: '',
        title: 'ISO Manager',
        controller: 'IsoListCtrl as vm',
        templateUrl: helper.basepath('pxe/iso/iso.index.html'),
      })
      .state('app.pxe.iso.view', {
        url: '/:id',
        title: 'View ISO',
        controller: 'IsoViewCtrl as vm',
        templateUrl: helper.basepath('pxe/iso/iso.view.html'),
      })
      .state('app.pxe.boot', {
        url: '/boot',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.boot.list', {
        url: '',
        title: 'Boot Scripts',
        controller: 'BootListCtrl as vm',
        templateUrl: helper.basepath('pxe/boot/boot.index.html'),
      })
      .state('app.pxe.boot.view', {
        url: '/:id',
        title: 'View Boot Script',
        controller: 'BootViewCtrl as vm',
        templateUrl: helper.basepath('pxe/boot/boot.view.html'),
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
        templateUrl: helper.basepath('pxe/shell/shell.index.html'),
      })
      .state('app.pxe.shell.view', {
        url: '/:id',
        title: 'View Shell Script',
        controller: 'ShellViewCtrl as vm',
        templateUrl: helper.basepath('pxe/shell/shell.view.html'),
      })
      ;
  }
})();
