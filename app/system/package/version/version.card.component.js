(function () {
  "use strict";

  angular
    .module("app.system.package")
    .component("packageVersionCard", {
      require: {},
      bindings: {
        package: "=",
      },
      controller: "PackageVersionCardCtrl as version",
      transclude: true,
      templateUrl: "app/system/package/version/version.card.html",
    })
    .controller("PackageVersionCardCtrl", PackageVersionCardCtrl);

  /**
   * @ngInject
   */
  function PackageVersionCardCtrl(Loader, _, Modal, ApiUpload) {
    var version = this;

    version.loader = Loader();
    version.loader.loaded();
    version.$onInit = init;
    version.viewUpdateDetails = viewUpdateDetails;
    version.upload = upload;
    version.custom = {
      upload: upload,
      package: null,
    };

    //////////

    function init() {}

    function upload() {
      return version.loader.during(
        ApiUpload.patch(
          "package/" + version.package.id,
          version.custom.package,
          { package: version.custom.package }
        )
      );
    }

    function viewUpdateDetails() {
      return version.loader.during(
        Modal.information("package.edit.version.modal.update")
          .templateUrl("app/system/package/version/version.modal.update.html")
          .data({
            version: version.package.version.latest,
          })
          .open()
          .result.then(function () {
            return version.package.patch({
              update: "LATEST",
            });
          })
      );
    }
  }
})();
