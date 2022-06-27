(function () {
  ("use strict");

  angular
    .module("app.system.permission-groups.list")
    .factory("PermissionGroupsList", PermissionGroupsListFactory);

  /**
   * PermissionGroupsList Factory
   *
   * @ngInject
   */
  function PermissionGroupsListFactory(List, ListConfirm) {
    return function () {
      var list = List("permission-group");
      var confirm = ListConfirm(list, "permission-groups.modal.delete");

      list.bulk.add("Delete", confirm.delete);

      return list;
    };
  }
})();
