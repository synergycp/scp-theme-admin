(function () {
  angular
    .module('app.system.ssh.key')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.ssh', {
        url: '/ssh',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.ssh.key', {
        url: '/key',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.ssh.key.home', {
        url: '',
        title: 'SSH Keys',
        controller: 'SSHKeyHomeCtrl as vm',
        templateUrl: helper.basepath('system/ssh-key/key.home.html'),
        resolve: helper.resolveFor('lang:ssh-key'),
      })
      ;

    helper.url.map('ssh/key/?([0-9]*)', function ($state, id) {
      return 'system/ssh/key'+(id && '/'+id);
    });
  }
})();
