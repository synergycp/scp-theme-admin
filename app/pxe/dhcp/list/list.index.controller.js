(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeDhcpIndexCtrl', PxeDhcpIndexCtrl);

  /**
   * @ngInject
   */
  function PxeDhcpIndexCtrl(PxeDhcpList, ListFilter) {
    var vm = this;

    vm.list = PxeDhcpList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.dhcp',
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
