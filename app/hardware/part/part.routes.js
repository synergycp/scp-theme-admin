(function () {
  angular
    .module('app.hardware.part')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.part', {
        url: '/part',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:part'),
      })
      .state('app.hardware.part.list', {
        url: '?tab&search',
        title: 'Part Inventory',
        controller: 'PartIndexCtrl as vm',
        templateUrl: helper.basepath('hardware/part/part.index.html'),
        reloadOnSearch: false,
      })
      ;

    helper.url('part/?([0-9]*)', function (id) {
      return 'hardware/part'+(id&&'?id='+id);
    });
  }
})();
