(function () {
  angular
    .module('app.system.package')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.package', {
        url: '/package',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:package'),
      })
      .state('app.system.package.view', {
        abstract: true,
        url: '/:id',
        template: helper.dummyTemplate,
      })
      .state('app.system.package.view.edit', {
        url: '',
        title: 'Edit Package',
        controller: 'PackageViewCtrl as vm',
        templateUrl: helper.basepath('system/package/view/package.view.html'),
      })
      ;

    helper.url.map('package/?([0-9]*)', function ($state, id) {
      return 'system/package'+(id && '/'+id);
    });
  }
})();
