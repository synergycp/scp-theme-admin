(function () {
  angular
    .module('app.system.email.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.email.list', {
        url: '?q',
        title: 'Emails',
        controller: 'EmailIndexCtrl as vm',
        templateUrl: helper.basepath('system/email/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
