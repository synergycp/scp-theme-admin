(function () {
  'use strict';

  angular
    .module("app.system.permission-groups.list")
    .controller("PermissionGroupsIndexCtrl", PermissionGroupsIndexCtrl);

  /**
   * @ngInject
   */
  function PermissionGroupsIndexCtrl(
    PermissionGroupsList,
    ListFilter,
    $scope,
    EventEmitter
  ) {
    var vm = this;

    vm.list = PermissionGroupsList().setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };
    EventEmitter().bindTo(vm.create);

    vm.logs = {
      filter: {
        target_type: "permission-group",
      },
    };

    activate();

    ////////////

    function activate() {
      $scope.$on("$destroy", onDestroy);
    }

    function create() {
      vm.list
        .create(vm.create.getData())
        .then(vm.create.fire.bind(null, "created"));
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
