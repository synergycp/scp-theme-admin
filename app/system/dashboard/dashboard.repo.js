(function () {
  'use strict';

  angular
    .module('app.system.dashboard')
    .service('SystemDashboardRepo', SystemDashboardRepo)
    .config(addSystemDashboardRepo)
    ;

  /**
   * @ngInject
   */
  function addSystemDashboardRepo(DashboardProvider) {
    DashboardProvider.addWithPriority('SystemDashboardRepo', 1);
  }

  /**
   * SystemDashboardRepo
   *
   * @ngInject
   */
  function SystemDashboardRepo(
    Api,
    EventEmitter,
    SystemDashboardPanel,
    _
  ) {
    var repo = this;

    repo.all = all;
    EventEmitter().bindTo(repo);

    ///////////

    function all() {
      repo.fire(
        'item',
        SystemDashboardPanel()
      );
    }
  }
})();
