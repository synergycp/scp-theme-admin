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
        controller: 'PreseedListCtrl as vm',
        templateUrl: helper.basepath('pxe/preseed/preseed.index.html'),
      })
      .state('app.pxe.preseed.view', {
        url: '/:id',
        title: 'View Preseed',
        controller: 'PreseedViewCtrl as vm',
        templateUrl: helper.basepath('pxe/preseed/preseed.view.html'),
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
