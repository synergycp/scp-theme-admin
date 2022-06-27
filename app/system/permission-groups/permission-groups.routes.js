(function () {
  angular.module("app.system.permission-groups").config(routeConfig);

  /**
   * @ngInject
   */
  function routeConfig($stateProvider, RouteHelpersProvider) {
    var helper = RouteHelpersProvider;
    $stateProvider
      .state("app.system.permission-groups", {
        url: "/permission-group",
        abstract: true,
        template: helper.dummyTemplate,
        resolve: helper.resolveFor(
          "lang:permission-groups",
          "lang:permissions"
        ),
      })
      .state("app.system.permission-groups.view", {
        abstract: true,
        url: "/:id",
        template: helper.dummyTemplate,
      })
      .state("app.system.permission-groups.view.edit", {
        url: "",
        title: "Edit Permission Group",
        controller: "PermissionGroupsViewCtrl as vm",
        templateUrl: helper.basepath(
          "system/permission-groups/permission-groups.view.html"
        ),
        resolve: helper.resolveFor("lang:permissions"),
      });

    helper.url.map("permission-group/?([0-9]*)", function ($state, id) {
      return "system/permission-groups" + (id && "/" + id);
    });
  }
})();
