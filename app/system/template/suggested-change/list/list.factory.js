(function () {
  ("use strict");

  angular
    .module("app.system.template.suggested-change")
    .factory("TemplateSuggestedChangeList", TemplateSuggestedChangeListFactory);

  /**
   * TemplateSuggestedChangeList Factory
   *
   * @ngInject
   */
  function TemplateSuggestedChangeListFactory(List, ListConfirm) {
    return function () {
      var list = List("template/suggested-change");
      list.confirm = ListConfirm(
        list,
        "template.suggested-change.modal.delete"
      );

      list.bulk.add("Delete", list.confirm.delete);

      return list;
    };
  }
})();
