(function () {
  'use strict';

  angular
    .module('app.user.admin.list')
    .controller('AdminIndexCtrl', AdminIndexCtrl);

  /**
   * @ngInject
   */
  function AdminIndexCtrl(AdminList, ListFilter, $scope) {
    var vm = this;

    vm.list = AdminList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'admin',
      },
    };

    activate();

    ////////////

    function activate() {
      $scope.$on('$destroy', onDestroy);
    }

    function create() {
      vm.list.create(vm.create.getData());
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
