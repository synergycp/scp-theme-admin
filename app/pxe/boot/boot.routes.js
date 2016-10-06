(function () {
  angular
    .module('app.pxe.boot')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.boot', {
        url: '/boot',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.boot.list', {
        url: '?q',
        title: 'Boot Scripts',
        controller: 'BootIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/boot/list/list.index.html'),
        reloadOnSearch: false,
      })
      .state('app.pxe.boot.view', {
        url: '/:id',
        title: 'View Boot Script',
        controller: 'BootViewCtrl as vm',
        templateUrl: helper.basepath('pxe/boot/boot.view.html'),
      })
      ;

    helper.url.map('pxe/template/?([0-9]*)', function (id) {
      return 'pxe/boot'+(id && '/'+id);
    });
  }
})();
