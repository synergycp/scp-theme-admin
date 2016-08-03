(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('AdminListCtrl', AdminListCtrl);

  /**
   * @ngInject
   */
  function AdminListCtrl(AdminList) {
    var vm = this;

    vm.list = AdminList();

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
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
