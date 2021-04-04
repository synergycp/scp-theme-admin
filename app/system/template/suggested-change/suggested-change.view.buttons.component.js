(function () {
  "use strict";

  angular
    .module("app.system.template.suggested-change")
    .component("templateSuggestedChangeButtons", {
      require: {},
      bindings: {
        templateSuggestedChange: "=",
      },
      controller: "TemplateSuggestedChangeButtonsCtrl as buttons",
      transclude: true,
      templateUrl:
        "app/system/template/suggested-change/suggested-change.view.buttons.html",
    })
    .controller(
      "TemplateSuggestedChangeButtonsCtrl",
      TemplateSuggestedChangeButtonsCtrl
    );

  /**
   * @ngInject
   */
  function TemplateSuggestedChangeButtonsCtrl(
    TemplateSuggestedChangeList,
    Loader,
    Modal,
    Api,
    $state
  ) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;
    buttons.overwrite = doOverwrite;

    //////////

    function init() {}

    function doDelete() {
      return buttons.loader.during(
        TemplateSuggestedChangeList()
          .confirm.delete([buttons.templateSuggestedChange])
          .result.then(transferToList)
      );
    }

    function doOverwrite() {
      return buttons.loader.during(
        Modal.confirm(
          [buttons.templateSuggestedChange],
          "template.suggested-change.modal.overwrite"
        )
          .open()
          .result.then(deleteAndSetBody)
          .then(transferToList)
      );
    }

    function deleteAndSetBody() {
      return Api.one(
        "template/suggested-change/" + buttons.templateSuggestedChange.id
      ).remove({
        body: buttons.templateSuggestedChange.suggested_body,
      });
    }

    function transferToList() {
      $state.go("app.system.template.suggested-change.list");
    }
  }
})();
