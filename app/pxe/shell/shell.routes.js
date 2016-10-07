(function () {
  angular
    .module('app.pxe.shell')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.shell', {
        url: '/shell',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.shell.view', {
        url: '/:id',
        title: 'View Shell Script',
        controller: 'ShellViewCtrl as vm',
        templateUrl: helper.basepath('pxe/shell/shell.view.html'),
      })
      ;

    helper.url.map('pxe/shell/?([0-9]*)', function ($state, id) {
      return 'pxe/shell'+(id && '/'+id);
    });
  }
})();
