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
    $state
  ) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;

    //////////

    function init() {}

    function doDelete() {
      return buttons.loader.during(
        TemplateSuggestedChangeList()
          .confirm.delete([buttons.templateSuggestedChange])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go("app.system.template.suggested-change.list");
    }
  }
})();
