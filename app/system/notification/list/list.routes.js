(function () {
  angular
    .module('app.system.notification.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.notification.list', {
        url: '?q',
        title: 'Notification',
        controller: 'NotificationIndexCtrl as vm',
        templateUrl: helper.basepath('system/notification/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
