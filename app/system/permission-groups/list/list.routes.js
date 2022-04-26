(function () {
  angular
    .module('app.system.permission-groups.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.permission-groups.list', {
        url: '?q',
        title: 'Permission Groups',
        controller: 'PermissionGroupsIndexCtrl as vm',
        templateUrl: helper.basepath('system/permission-groups/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
