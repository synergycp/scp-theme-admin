(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('BootIndexCtrl', BootIndexCtrl);

  /**
   * @ngInject
   */
  function BootIndexCtrl(PxeBootList, ListFilter) {
    var vm = this;

    vm.list = PxeBootList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.boot-script',
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
