(function () {
  angular
    .module('app.pxe.profile.list')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.profile.list', {
        url: '?q',
        title: 'Profiles',
        controller: 'ProfileIndexCtrl as vm',
        templateUrl: helper.basepath('pxe/profile/list/list.index.html'),
        reloadOnSearch: false,
      })
      ;
  }
})();
