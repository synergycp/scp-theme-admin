(function () {
  'use strict';

  var DIR = 'system/health/dashboard/';

  angular
    .module('app.system.health.dashboard')
    .factory('SystemHealthDashboardPanel', SystemHealthDashboardPanelFactory);

  /**
   * SystemHealthDashboardPanel Factory
   *
   * @ngInject
   */
  function SystemHealthDashboardPanelFactory(
    RouteHelpers
  ) {
    return function () {
      return new SystemHealthDashboardPanel(
        RouteHelpers
      );
    };
  }

  function SystemHealthDashboardPanel(
    RouteHelpers
  ) {
    var panel = this;

    panel.templateUrl = RouteHelpers.basepath(DIR + 'dashboard.panel.html');
    panel.context = {};
  }
})();
