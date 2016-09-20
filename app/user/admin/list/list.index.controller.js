(function () {
  'use strict';

  angular
    .module('app.user.admin.list')
    .controller('AdminIndexCtrl', AdminIndexCtrl);

  /**
   * @ngInject
   */
  function AdminIndexCtrl(AdminList, ListFilter) {
    var vm = this;

    vm.list = AdminList();
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
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
