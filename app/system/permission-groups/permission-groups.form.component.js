(function () {
  "use strict";

  var INPUTS = {
    name: "",
  };
  angular
    .module("app.system.permission-groups")
    .component("permissionGroupsForm", {
      require: {},
      bindings: {
        form: "=",
      },
      controller: "PermissionGroupsFormCtrl as permissionGroupsForm",
      transclude: true,
      templateUrl: "app/system/permission-groups/permission-groups.form.html",
    })
    .controller("PermissionGroupsFormCtrl", PermissionGroupsFormCtrl);

  /**
   * @ngInject
   */
  function PermissionGroupsFormCtrl(Api, PermissionLang, $stateParams, $q) {
    var permissionGroupsForm = this;

    permissionGroupsForm.$onInit = init;
    permissionGroupsForm.input = _.clone(INPUTS);
    permissionGroupsForm.permissions = {};

    function init() {
      getPermissionGroupID()
        .then(function (permissionGroups) {
          return Api.one(
            "permission-group/" + permissionGroups + "/permission"
          ).get();
        })
        .then(function (response) {
          _.merge(permissionGroupsForm.permissions, response.getOriginalData());
          PermissionLang.load(permissionGroupsForm.permissions);
        });
      permissionGroupsForm.form.getData = getData;
      permissionGroupsForm.form.getPermissions = getPermissions;
      fillFormInputs();

      var listen = permissionGroupsForm.form.on || function () {};
      listen(["change", "load"], fillFormInputs);
      listen(["created"], savePermissions);
    }

    function getData() {
      return _.clone(permissionGroupsForm.input);
    }

    function getPermissions() {
      return _.clone(permissionGroupsForm.permissions);
    }

    function fillFormInputs() {
      _.overwrite(permissionGroupsForm.input, permissionGroupsForm.form.input);
      _.overwrite(
        permissionGroupsForm.permissions,
        permissionGroupsForm.form.permissions
      );
    }

    function savePermissions(created) {
      Api.one("permission-group/" + created.id + "/permission").patch(
        permissionGroupsForm.permissions
      );
    }

    function getPermissionGroupID() {
      if (!$stateParams.id) {
        return Api.all("permission-group")
          .getList()
          .then(function (permissionGroups) {
            return permissionGroups[0].id;
          });
      } else {
        return $q.when($stateParams.id);
      }
    }
  }
})();
