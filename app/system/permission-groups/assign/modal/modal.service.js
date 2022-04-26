(function () {
  ("use strict");

  angular
    .module("app.system.permission-groups")
    .service("PermissionGroupsAssignModal", PermissionGroupsAssignModal);

  /**
   * PermissionGroupsAssignModal Service
   *
   * @ngInject
   */
  function PermissionGroupsAssignModal($uibModal, $q, Api) {
    var PermissionGroupsAssignModal = this;
    var $api = Api.all("permission-group");

    PermissionGroupsAssignModal.delete = remove;

    //////////

    function remove(permissionGroups) {
      var modal = $uibModal.open({
        templateUrl: "app/system/permission-groups/assign/modal/modal.delete.html",
        controller: "ModalConfirmCtrl",
        bindToController: true,
        controllerAs: "modal",
        resolve: {
          items: function () {
            return permissionGroups;
          },
          lang: function () {
            return "permission-groups.modal.delete";
          },
          inputs: function () {
            return function () {}; // refactor this. What is actually 'inputs'?
          },
          data: function () {
            return function () {};
          },
        },
      });

      return modal.result.then($bulk(permissionGroups).remove);
    }

    function $bulk(permissionGroups) {
      var permissionGroupIds = _.map(permissionGroups, "id").join(",");

      return $api.one(permissionGroupIds);
    }
  }
})();
