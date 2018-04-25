(function () {
  'use strict';

  angular
    .module('app.network.group.dashboard')
    .service('GroupDashboardRepo', GroupDashboardRepo)
    .run(addGroupDashboardRepo)
    ;

  /**
   * @ngInject
   */
  function addGroupDashboardRepo(Dashboard) {
    Dashboard.add('GroupDashboardRepo');
  }

  /**
   * GroupDashboardRepo
   *
   * @ngInject
   */
  function GroupDashboardRepo(
    Api,
    EventEmitter,
    GroupDashboardPanel,
    _
  ) {
    var repo = this;

    repo.all = all;
    EventEmitter().bindTo(repo);

    ///////////

    function all() {
      repo.fire(
        'item',
        GroupDashboardPanel()
      );
    }
  }
})();
