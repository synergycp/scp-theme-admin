(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeFileIndexCtrl', PxeFileIndexCtrl);

  /**
   * @ngInject
   */
  function PxeFileIndexCtrl(PxeFileList, ListFilter) {
    var vm = this;

    vm.list = PxeFileList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.server.file',
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
