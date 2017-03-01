(function () {
  angular
    .module('app.pxe.driver')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.driver', {
        url: '/driver',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.driver.view', {
        url: '/:id',
        title: 'View PXE Driver',
        controller: 'PxeDriverViewCtrl as vm',
        templateUrl: helper.basepath('pxe/driver/view/driver.view.html'),
      })
      ;

    helper.url.map('pxe/driver/?([0-9]*)', function ($state, id) {
      return 'pxe/driver'+(id && '/'+id);
    });
  }
})();
