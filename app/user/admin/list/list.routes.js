(function () {
  angular
    .module('app.user.admin.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.user.admin.list', {
        url: '?q',
        title: 'Administrators',
        controller: 'AdminIndexCtrl as vm',
        templateUrl: helper.basepath('user/admin/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
