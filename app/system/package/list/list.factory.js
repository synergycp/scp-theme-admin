(function () {
  "use strict";

  angular
    .module("app.system.package.list")
    .factory("PackageList", PackageListFactory);

  /**
   * PackageList Factory
   *
   * @ngInject
   */
  function PackageListFactory(List, ListConfirm, ApiUpload) {
    return function () {
      var list = List("package");
      list.confirm = ListConfirm(list);
      list.confirm.delete = list.confirm.deleter("package.modal.delete");
      list.confirm.enable = list.confirm.patcher(
        {
          status: "ENABLED",
        },
        "package.modal.enable",
        {
          submitClass: "btn-success",
        }
      );
      list.confirm.disable = list.confirm.patcher(
        {
          status: "DISABLED",
        },
        "package.modal.disable",
        {
          submitClass: "btn-warning",
        }
      );
      list.confirm.update = list.confirm.patcher(
        {
          update: "LATEST",
        },
        "package.modal.update",
        {
          submitClass: "btn-success",
        }
      );

      list.bulk.add("Delete", list.confirm.delete);
      list.bulk.add("Enable", list.confirm.enable);
      list.bulk.add("Disable", list.confirm.disable);
      list.bulk.add("Update", list.confirm.update);

      var superCreate = list.create;
      list.create = function (data) {
        if (data.package) {
          return ApiUpload.post("package", data.package, data).then(
            function () {
              list.load();
            }
          );
        } else {
          return superCreate(data);
        }
      };

      return list;
    };
  }
})();
