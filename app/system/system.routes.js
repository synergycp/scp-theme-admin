(function () {
  angular.module('app.core.routes')
    .config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system', {
        url: '/system',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.email', {
        url: '/email',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.email.list', {
        url: '',
        title: 'Emails',
        controller: 'EmailListCtrl as vm',
        templateUrl: helper.basepath('system/email/email.index.html'),
      })
      .state('app.system.email.view', {
        url: '/:id',
        title: 'View Email',
        controller: 'EmailViewCtrl as vm',
        templateUrl: helper.basepath('system/email/email.view.html'),
      })
      .state('app.system.log', {
        url: '/log',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.log.list', {
        url: '',
        title: 'Logs',
        controller: 'LogListCtrl as vm',
        templateUrl: helper.basepath('system/log/log.index.html'),
      })
      .state('app.system.log.view', {
        url: '/:id',
        title: 'View Log',
        controller: 'LogViewCtrl as vm',
        templateUrl: helper.basepath('system/log/log.view.html'),
      })
      ;
  }
})();
