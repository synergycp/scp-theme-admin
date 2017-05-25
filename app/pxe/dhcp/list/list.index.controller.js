(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeServerIndexCtrl', PxeServerIndexCtrl);

  /**
   * @ngInject
   */
  function PxeServerIndexCtrl(PxeServerList, ListFilter) {
    var vm = this;

    vm.list = PxeServerList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.server.dhcp',
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
