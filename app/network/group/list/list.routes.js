(function () {
  angular
    .module('app.network.group.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.group.list', {
        url: '?q',
        title: 'Groups',
        controller: 'GroupIndexCtrl as vm',
        reloadOnSearch: false,
        templateUrl: helper.basepath('network/group/list/list.index.html'),
      })
      ;
  }
})();
