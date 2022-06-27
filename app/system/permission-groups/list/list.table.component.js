(function () {
  'use strict';

  angular
    .module("app.system.permission-groups.list")
    .component("permissionGroupsTable", {
      require: {
        list: "^list",
      },
      bindings: {},
      controller: "PermissionGroupsTableCtrl as table",
      transclude: true,
      templateUrl: "app/system/permission-groups/list/list.table.html",
    })
    .controller("PermissionGroupsTableCtrl", PermissionGroupsTableCtrl);

  /**
   * @ngInject
   */
  function PermissionGroupsTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {});
    }
  }
})();
