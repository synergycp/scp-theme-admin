(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('BootListCtrl', BootListCtrl);

  /**
   * @ngInject
   */
  function BootListCtrl(PxeBootList) {
    var vm = this;

    vm.list = PxeBootList();

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe-boot-script',
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
