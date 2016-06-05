(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ShellListCtrl', ShellListCtrl);

  /**
   * @ngInject
   */
  function ShellListCtrl(List) {
    var vm = this;

    vm.list = List('pxe/shell');
    vm.list.bulk.add('Delete', vm.list.delete);

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
      vm.list.create(vm.create.input);
    }
  }
})();
