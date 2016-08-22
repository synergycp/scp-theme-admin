(function () {
  'use strict';

  angular
    .module('app.hardware.switch')
    .config(routeConfig)
    ;

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state('app.hardware.switch', {
        url: '/switch',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.switch.speed', {
        url: '/speed',
        abstract: true,
        template: helper.dummyTemplate,
      })
      .state('app.hardware.switch.speed.list', {
        url: '',
        title: 'Switch Speeds',
        controller: 'SpeedListCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/speed/speed.index.html'),
      })
      .state('app.hardware.switch.speed.view', {
        url: '/:id',
        title: 'View Switch Speed',
        controller: 'SpeedViewCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/speed/speed.view.html'),
      })
      .state('app.hardware.switch.list', {
        url: '',
        title: 'Switches',
        controller: 'SwitchListCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/switch.index.html'),
      })
      .state('app.hardware.switch.view', {
        url: '/:id',
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor('lang:bandwidth'),
      })
      .state('app.hardware.switch.view.edit', {
        url: '/edit',
        title: 'Edit Switch',
        controller: 'SwitchEditCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/switch.edit.html'),
      })
      .state('app.hardware.switch.view.manage', {
        url: '?bandwidth.start&bandwidth.end&bandwidth.tab',
        title: 'Manage Switch',
        reloadOnSearch: false,
        controller: 'SwitchManageCtrl as vm',
        templateUrl: helper.basepath('hardware/switch/manage/manage.html'),
        resolve: helper.resolveFor(
          'chart-js', 'after:ng-chart-js',
          'moment', 'after:date-range-picker',
          'numeral'
        ),
      })
      ;
  }
})();
