(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ShellIndexCtrl', ShellIndexCtrl);

  /**
   * @ngInject
   */
  function ShellIndexCtrl(PxeShellList, ListFilter) {
    var vm = this;

    vm.list = PxeShellList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe-shell-script',
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
