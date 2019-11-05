(function () {
  'use strict';

  var DIR = 'system/dashboard/';

  angular
    .module('app.system.dashboard')
    .factory('SystemDashboardPanel', SystemDashboardPanelFactory);

  /**
   * SystemDashboardPanel Factory
   *
   * @ngInject
   */
  function SystemDashboardPanelFactory(
    RouteHelpers
  ) {
    return function () {
      return new SystemDashboardPanel(
        RouteHelpers
      );
    };
  }

  function SystemDashboardPanel(
    RouteHelpers
  ) {
    var panel = this;

    panel.templateUrl = RouteHelpers.basepath(DIR + 'dashboard.panel.html');
    panel.context = {};
  }
})();
