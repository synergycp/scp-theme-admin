(function () {
  angular
    .module('app.pxe.profile')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.pxe.profile', {
        url: '/profile',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.pxe.profile.view', {
        url: '/:id',
        title: 'View Profile',
        controller: 'ProfileViewCtrl as vm',
        templateUrl: helper.basepath('pxe/profile/profile.view.html'),
      })
      ;

    helper.url.map('pxe/profile/?([0-9]*)', function ($state, id) {
      return 'pxe/profile'+(id && '/'+id);
    });
  }
})();
