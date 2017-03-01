(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeDriverIndexCtrl', PxeDriverIndexCtrl);

  /**
   * @ngInject
   */
  function PxeDriverIndexCtrl(PxeDriverList, ListFilter) {
    var vm = this;

    vm.list = PxeDriverList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.driver',
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
