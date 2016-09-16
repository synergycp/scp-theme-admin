(function () {
  'use strict';

  angular
    .module('app.system.log.dashboard')
    .service('LogDashboardRepo', LogDashboardRepo)
    .config(addLogDashboardRepo)
    ;

  /**
   * @ngInject
   */
  function addLogDashboardRepo(DashboardProvider) {
    DashboardProvider.add('LogDashboardRepo');
  }

  /**
   * LogDashboardRepo
   *
   * @ngInject
   */
  function LogDashboardRepo(
    EventEmitter,
    DashboardLogPanel,
    RouteHelpers
  ) {
    var repo = this;

    repo.all = all;
    EventEmitter().bindTo(repo);

    ///////////

    function all() {
      repo.fire(
        'item',
        DashboardLogPanel()
      );

      RouteHelpers.loadLang('log');
    }
  }
})();
