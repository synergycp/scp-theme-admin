(function () {
  "use strict";

  var INPUTS = {
    name: "",
    description: "",
    body: "",
  };

  angular
    .module("app.system.template.suggested-change")
    .component("templateSuggestedChangeForm", {
      require: {},
      bindings: {
        form: "=",
      },
      controller:
        "TemplateSuggestedChangeFormCtrl as templateSuggestedChangeForm",
      transclude: true,
      templateUrl:
        "app/system/template/suggested-change/suggested-change.form.html",
    })
    .controller(
      "TemplateSuggestedChangeFormCtrl",
      TemplateSuggestedChangeFormCtrl
    );

  /**
   * @ngInject
   */
  function TemplateSuggestedChangeFormCtrl() {
    var templateSuggestedChangeForm = this;

    templateSuggestedChangeForm.$onInit = init;
    templateSuggestedChangeForm.input = _.clone(INPUTS);

    //////////

    function init() {
      templateSuggestedChangeForm.form.getData = getData;
      fillFormInputs();

      (templateSuggestedChangeForm.form.on || function () {})(
        ["change", "load"],
        fillFormInputs
      );
    }

    function getData() {
      return _.clone(templateSuggestedChangeForm.input);
    }

    function fillFormInputs() {
      _.overwrite(
        templateSuggestedChangeForm.input,
        templateSuggestedChangeForm.form.input
      );
    }
  }
})();
