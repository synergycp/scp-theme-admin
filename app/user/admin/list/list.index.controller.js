(function () {
  'use strict';

  angular
    .module('app.user.admin.list')
    .controller('AdminIndexCtrl', AdminIndexCtrl);

  /**
   * @ngInject
   */
  function AdminIndexCtrl(AdminList, ListFilter, $scope, EventEmitter) {
    var vm = this;

    vm.list = AdminList()
      .setPaginationAndSortToUrl();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };
    EventEmitter().bindTo(vm.create);

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
      vm.list.create(vm.create.getData())
        .then(vm.create.fire.bind(null, 'created'));
    }

    function onDestroy() {
      vm.list.clearPaginationAndSortFromUrl();
    }
  }
})();
