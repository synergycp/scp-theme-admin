const { $QUESTION } = require("prettier");

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
  function PermissionGroupsFormCtrl(Api, PermissionLang) {
    var permissionGroupsForm = this;

    permissionGroupsForm.$onInit = init;
    permissionGroupsForm.input = _.clone(INPUTS);
    permissionGroupsForm.permissions = {};

    function init() {
      getPermissionGroupID()
        .then(function (permissionGroups) {
          return Api.one(
            "permission-group/" + permissionGroups[0].id + "/permission"
          ).get();
        })
        .then(function (response) {
          _.merge(
            permissionGroupsForm.permissions,
            response.getOriginalData()
          );
          PermissionLang.load(permissionGroupsForm.permissions);
          console.log(permissionGroupsForm.permissions);
        });
      permissionGroupsForm.form.getData = getData;
      fillFormInputs();

      var listen = permissionGroupsForm.form.on || function () {};
      listen(["change", "load"], fillFormInputs);
      listen(["created"], savePermissions);
    }

    function getData() {
      return _.clone(permissionGroupsForm.input);
    }

    function fillFormInputs() {
      _.overwrite(permissionGroupsForm.input, permissionGroupsForm.form.input);
    }

    function savePermissions(created) {
      Api.one("permission-group/" + created.id + "/permission").patch(
        permissionGroupsForm.permissions
      );
    }

    function getPermissionGroupID() {
      if (!_.get(permissionGroupsForm.form, 'input.id')) {
        Api.all("permission-group")
          .getList()
          .then(function (permissionGroups) {
            return permissionGroups[0].id;
          });
      }
      else {
        return $q.when(permissionGroupsForm.form.input.id);
      }
    }
  }
})();
