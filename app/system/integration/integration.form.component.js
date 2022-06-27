(function () {
  "use strict";

  var INPUTS = {
    name: "",
    subject: "",
    body: "",
    permission_group_id: null,
  };

  angular
    .module("app.system")
    .component("integrationForm", {
      require: {},
      bindings: {
        form: "=",
      },
      controller: "IntegrationFormCtrl as integrationForm",
      transclude: true,
      templateUrl: "app/system/integration/integration.form.html",
    })
    .controller("IntegrationFormCtrl", IntegrationFormCtrl);

  /**
   * @ngInject
   */
  function IntegrationFormCtrl(Api) {
    var integrationForm = this;

    integrationForm.$onInit = init;
    integrationForm.input = _.clone(INPUTS);
    integrationForm.permission_groups = [];

    //////////

    function init() {
      Api.all("permission-group")
        .getList()
        .then(function (response) {
          _.setContents(integrationForm.permission_groups, response);
          integrationForm.input.permission_group_id =
            integrationForm.input.permission_group_id ||
            integrationForm.permission_groups[0].id;
        });

      integrationForm.form.getData = getData;
      fillFormInputs();

      var listen = integrationForm.form.on || function () {};

      listen(["change", "load"], fillFormInputs);
    }

    function getData() {
      return _.clone(integrationForm.input);
    }

    function fillFormInputs() {
      _.overwrite(integrationForm.input, integrationForm.form.input);
    }
  }
})();
