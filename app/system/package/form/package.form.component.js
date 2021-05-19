(function () {
  "use strict";

  var INPUTS = {
    slug: "",
  };

  angular
    .module("app.system")
    .component("packageForm", {
      require: {},
      bindings: {
        form: "=",
      },
      controller: "PackageFormCtrl as packageForm",
      transclude: true,
      templateUrl: "app/system/package/form/package.form.html",
    })
    .controller("PackageFormCtrl", PackageFormCtrl);

  /**
   * @ngInject
   */
  function PackageFormCtrl() {
    var packageForm = this;

    packageForm.$onInit = init;
    packageForm.input = _.clone(INPUTS);
    packageForm.package = null;

    //////////

    function init() {
      packageForm.form.getData = getData;
      fillFormInputs();

      var listen = packageForm.form.on || function () {};

      listen(["change", "load"], fillFormInputs);
    }

    function getData() {
      var data = _.clone(packageForm.input);
      data.package = packageForm.package;

      return data;
    }

    function fillFormInputs() {
      _.overwrite(packageForm.input, packageForm.form.input);
    }
  }
})();
