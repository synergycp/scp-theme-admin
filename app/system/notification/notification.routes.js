(function () {
  angular
    .module('app.system.notification')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.notification', {
        url: '/notification',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.notification.view', {
        url: '/:id',
        title: 'View Notification',
        controller: 'NotificationViewCtrl as vm',
        templateUrl: helper.basepath('system/notification/notification.view.html'),
      })
      ;

    // helper.url.map('email/template/?([0-9]*)', function ($state, id) {
    //   return 'system/email'+(id && '/'+id);
    // });
  }
})();
