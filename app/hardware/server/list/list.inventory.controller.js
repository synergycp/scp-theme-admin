(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('ServerInventoryCtrl', ServerInventoryCtrl)
    ;

  /**
   * ServerInventory Controller
   *
   * @ngInject
   */
  function ServerInventoryCtrl(ServerList, ListFilter) {
    var vm = this;

    vm.list = ServerList().filter({
      inventory: 1,
    });
    vm.filters = ListFilter(vm.list);
    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'server',
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
