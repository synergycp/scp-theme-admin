(function () {
  "use strict";

  var INPUTS = {
    id: 0,
    name: "",
    suggested_body: "Loading ...",
    current_body: "Loading ...",
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
  function TemplateSuggestedChangeFormCtrl($state, Api, $q) {
    var templateSuggestedChangeForm = this;

    templateSuggestedChangeForm.$onInit = init;
    templateSuggestedChangeForm.input = _.clone(INPUTS);
    templateSuggestedChangeForm.merge = doMerge;
    templateSuggestedChangeForm.ourFiles = { file: "Loading..." };
    templateSuggestedChangeForm.theirFiles = { file: "Loading..." };
    templateSuggestedChangeForm.mergelySettings = {
      height: "auto",
    };

    //////////

    function doMerge(result) {
      return Api.one(
        "template/suggested-change/" + templateSuggestedChangeForm.input.id
      )
        .remove({
          body: result.file,
        })
        .then(transferToList);
    }

    function transferToList() {
      $state.go("app.system.template.suggested-change.list");
    }

    function init() {
      fillFormInputs();

      (templateSuggestedChangeForm.form.on || function () {})(
        ["change", "load"],
        fillFormInputs
      );
    }

    function fillFormInputs() {
      _.overwrite(
        templateSuggestedChangeForm.input,
        templateSuggestedChangeForm.form.input
      );
      templateSuggestedChangeForm.ourFiles = {
        file: templateSuggestedChangeForm.input.current_body,
      };
      templateSuggestedChangeForm.theirFiles = {
        file: templateSuggestedChangeForm.input.suggested_body,
      };
    }
  }
})();
