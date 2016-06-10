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
  function ServerInventoryCtrl(ServerList) {
    var vm = this;

    vm.list = ServerList().filter({
      available: 1,
    });
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
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
