(function () {
  "use strict";

  angular
    .module("app.system.template.suggested-change")
    .controller(
      "TemplateSuggestedChangeViewCtrl",
      TemplateSuggestedChangeViewCtrl
    );

  /**
   * View TemplateSuggestedChange Controller
   *
   * @ngInject
   */
  function TemplateSuggestedChangeViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit("template/suggested-change/" + $stateParams.id);

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent();
    }
  }
})();
