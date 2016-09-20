(function () {
  'use strict';

  angular
    .module('app.hardware.server.view.manage')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.server.view.manage', {
        url: '?bandwidth.start&bandwidth.end',
        title: 'Manage Server',
        reloadOnSearch: false,
        controller: 'ServerManageCtrl as vm',
        templateUrl: helper.basepath('hardware/server/view/manage/manage.html'),
        resolve: helper.resolveFor(
          'chart-js', 'after:ng-chart-js',
          'moment', 'after:date-range-picker',
          'numeral'
        ),
      })
      ;
  }
})();
