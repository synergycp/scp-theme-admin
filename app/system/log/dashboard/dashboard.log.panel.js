(function () {
  'use strict';

  var DIR = 'system/log/dashboard/';

  angular
    .module('app.system.log.dashboard')
    .factory('DashboardLogPanel', DashboardLogPanelFactory);

  /**
   * DashboardLogPanel Factory
   *
   * @ngInject
   */
  function DashboardLogPanelFactory (List, Loader, RouteHelpers) {
    return function () {
        return new DashboardLogPanel(List, Loader, RouteHelpers);
    };
  }

  function DashboardLogPanel (List, Loader, RouteHelpers) {
    var panel = this;

    panel.templateUrl = RouteHelpers.basepath(DIR + 'dashboard.log.html');
    panel.context = {
      loader: Loader(),
      list: List('log'),
    };

    //////////


  }
})();
