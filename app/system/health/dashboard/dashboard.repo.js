(function () {
  'use strict';

  angular
    .module('app.system.health.dashboard')
    .service('SystemHealthDashboardRepo', SystemHealthDashboardRepo)
    .config(addSystemHealthDashboardRepo)
    ;

  /**
   * @ngInject
   */
  function addSystemHealthDashboardRepo(DashboardProvider) {
    DashboardProvider.addWithPriority('SystemHealthDashboardRepo', 1);
  }

  /**
   * SystemHealthDashboardRepo
   *
   * @ngInject
   */
  function SystemHealthDashboardRepo(
    Api,
    EventEmitter,
    SystemHealthDashboardPanel,
    _
  ) {
    var repo = this;

    repo.all = all;
    EventEmitter().bindTo(repo);

    ///////////

    function all() {
      repo.fire(
        'item',
        SystemHealthDashboardPanel()
      );
    }
  }
})();
