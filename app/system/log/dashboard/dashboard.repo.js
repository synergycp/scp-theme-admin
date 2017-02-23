(function () {
  'use strict';

  angular
    .module('app.system.log.dashboard')
    .service('LogDashboardRepo', LogDashboardRepo)
    .run(addLogDashboardRepo)
    ;

  /**
   * @ngInject
   */
  function addLogDashboardRepo(Dashboard, Permission, Auth) {
    var show = Dashboard.add.bind(null, 'LogDashboardRepo');
    var hide = Dashboard.remove.bind(null, 'LogDashboardRepo');

    Auth.whileLoggedIn(checkPerms, hide);

    function checkPerms() {
      Permission
        .ifHas('system.logs.read')
        .then(show)
      ;
    }
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
