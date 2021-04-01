(function () {
  "use strict";

  angular
    .module("app.system.template.suggested-change")
    .controller(
      "TemplateSuggestedChangeIndexCtrl",
      TemplateSuggestedChangeIndexCtrl
    );

  /**
   * @ngInject
   */
  function TemplateSuggestedChangeIndexCtrl(
    TemplateSuggestedChangeList,
    ListFilter,
    $scope
  ) {
    var vm = this;

    vm.list = TemplateSuggestedChangeList().setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    activate();

    ////////////

    function activate() {
      vm.list.load();
      $scope.$on("$destroy", onDestroy);
    }

    function create() {
      vm.list.create(vm.create.getData());
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
