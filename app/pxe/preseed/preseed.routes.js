(function () {
  angular
    .module('app.pxe.preseed')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.preseed', {
        url: '/preseed',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.preseed.view', {
        url: '/:id',
        title: 'View Preseed',
        controller: 'PreseedViewCtrl as vm',
        templateUrl: helper.basepath('pxe/preseed/preseed.view.html'),
      })
      ;

    helper.url.map('pxe/preseed/?([0-9]*)', function (id) {
      return 'pxe/preseed'+(id && '/'+id);
    });
  }
})();
