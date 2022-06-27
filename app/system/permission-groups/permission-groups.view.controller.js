(function () {
  "use strict";

  angular
    .module("app.system.permission-groups")
    .controller("PermissionGroupsViewCtrl", PermissionGroupsViewCtrl);

  /**
   * AdminView Controller
   *
   * @ngInject
   */
  function PermissionGroupsViewCtrl(
    Api,
    Edit,
    $stateParams
  ) {
    var vm = this;
    var $api;
    vm.edit = Edit("permission-group/" + $stateParams.id);
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: "permission-group",
        target_id: $stateParams.id,
      },
    };
    vm.$onInit = init;
    //////////

    function init() {
      $api = Api.one("permission-group/" + $stateParams.id + "/permission");

      vm.edit.getCurrent();
    }

    function submit() {
      vm.edit.patch(vm.edit.getData());
      $api.patch(vm.edit.getPermissions());
    }
  }
})();
