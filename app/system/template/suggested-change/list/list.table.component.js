(function () {
  "use strict";

  angular
    .module("app.system.template.suggested-change.list")
    .component("templateSuggestedChangeTable", {
      require: {
        list: "^list",
      },
      bindings: {
        showActions: "=?",
      },
      controller: "TemplateSuggestedChangeTableCtrl as table",
      transclude: true,
      templateUrl: "app/system/template/suggested-change/list/list.table.html",
    })
    .controller(
      "TemplateSuggestedChangeTableCtrl",
      TemplateSuggestedChangeTableCtrl
    );

  /**
   * @ngInject
   */
  function TemplateSuggestedChangeTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showChangelog: true,
        showActions: true,
      });
    }
  }
})();
