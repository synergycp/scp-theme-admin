(function () {
  angular
    .module('app.system.setting')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.system.setting', {
        url: '/setting',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.system.setting.list', {
        url: '?tab',
        title: 'Settings',
        controller: 'SettingIndexCtrl as vm',
        templateUrl: helper.basepath('system/setting/setting.index.html'),
        reloadOnSearch: false,
      })
      ;

    helper.url.map('system/setting/?([0-9]*)', function () {
      return 'system/setting';
    });
  }
})();
