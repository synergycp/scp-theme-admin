(function () {
  "use strict";

  angular
    .module("app.network.group.dashboard")
    .service("GroupDashboardRepo", GroupDashboardRepo)
    .run(addGroupDashboardRepo);

  /**
   * @ngInject
   */
  function addGroupDashboardRepo(Permission, Auth, Dashboard) {
    Auth.whileLoggedIn(
      function () {
        Permission.ifHas("network.groups.read").then(function () {
          Dashboard.add("GroupDashboardRepo");
        });
      },
      function () {
        Dashboard.remove("GroupDashboardRepo");
      }
    );
  }

  /**
   * GroupDashboardRepo
   *
   * @ngInject
   */
  function GroupDashboardRepo(EventEmitter, GroupDashboardPanel, _) {
    var repo = this;

    repo.all = all;
    EventEmitter().bindTo(repo);

    ///////////

    function all() {
      repo.fire("item", GroupDashboardPanel());
    }
  }
})();
