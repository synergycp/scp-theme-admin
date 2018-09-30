(function () {
  angular
    .module('app.network.entity.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.entity.list', {
        url: '?group.id&server.id&q',
        title: 'Entities',
        controller: 'EntityIndexCtrl as vm',
        templateUrl: helper.basepath('network/entity/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
