(function () {
  angular
    .module('app.system.email')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.email', {
        url: '/email',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.email.view', {
        url: '/:id',
        title: 'View Email',
        controller: 'EmailViewCtrl as vm',
        templateUrl: helper.basepath('system/email/email.view.html'),
      })
      ;

    helper.url.map('email/template/?([0-9]*)', function ($state, id) {
      return 'system/email'+(id && '/'+id);
    });
  }
})();
