(function () {
  "use strict";

  angular
    .module("app.system.permission-groups.buttons")
    .controller("PermissionGroupsButtonsCtrl", PermissionGroupsButtonsCtrl);

  /**
   * @ngInject
   */
  function PermissionGroupsButtonsCtrl(
    PermissionGroupsAssignModal,
    Loader,
    $state,
    _
  ) {
    var buttons = this;

    buttons.loader = Loader();

    buttons.delete = confirmDelete;
    buttons.$onInit = init;

    //////////

    function init() {
      _.defaults(buttons, {
        showEdit: true,
        showManage: true,
      });
    }

    function confirmDelete() {
      return buttons.loader.during(
        PermissionGroupsAssignModal.delete([buttons.permissionGroups]).then(
          transferToList
        )
      );
    }

    function transferToList() {
      $state.go("app.system.permission-groups.list");
    }
  }
})();
