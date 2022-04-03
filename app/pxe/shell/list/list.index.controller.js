(function () {
  "use strict";

  angular.module("app.pxe").controller("ShellIndexCtrl", ShellIndexCtrl);

  /**
   * @ngInject
   */
  function ShellIndexCtrl(PxeShellList, ListFilter, $scope) {
    var vm = this;

    vm.list = PxeShellList().setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: "pxe.shell",
      },
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
