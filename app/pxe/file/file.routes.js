(function () {
  angular
    .module('app.pxe.file')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.file', {
        url: '/file',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.file.view', {
        url: '/:id',
        title: 'View PXE File Server',
        controller: 'PxeFileViewCtrl as vm',
        templateUrl: helper.basepath('pxe/file/view/pxe-file.view.html'),
      })
      ;

    helper.url.map('pxe/file/?([0-9]*)', function ($state, id) {
      return 'pxe/file'+(id && '/'+id);
    });
  }
})();
