(function () {
  'use strict';

  angular
    .module('app.network.switch.view.manage')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.network.switch.view.manage', {
        url: '?bandwidth.start&bandwidth.end&bandwidth.tab',
        title: 'Manage Switch',
        reloadOnSearch: false,
        controller: 'SwitchManageCtrl as vm',
        templateUrl: helper.basepath('network/switch/view/manage/manage.html'),
        resolve: helper.resolveFor(
          'chart-js', 'after:ng-chart-js',
          'moment', 'after:date-range-picker',
          'numeral'
        ),
      })
      ;
  }
})();
