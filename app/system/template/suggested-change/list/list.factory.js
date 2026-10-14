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
  function TemplateSuggestedChangeListFactory(List, ListConfirm, Modal) {
    return function () {
      var list = List("template/suggested-change");
      list.confirm = ListConfirm(
        list,
        "template.suggested-change.modal.delete"
      );
      list.overwrite = overwrite;

      list.bulk.add("Overwrite Current", overwrite);
      list.bulk.add("Delete", list.confirm.delete);

      return list;

      function overwrite(items) {
        // Ascending id: when several changes target the same template, the newest wins.
        items = _.sortBy(items, "id");
        var modal = Modal.confirm(
          items,
          "template.suggested-change.modal.overwrite"
        ).open();
        modal.result = modal.result.then(function () {
          return list.delete({ overwrite: 1 }, items);
        });
        return modal;
      }
    };
  }
})();
