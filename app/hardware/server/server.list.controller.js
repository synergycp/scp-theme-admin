(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('ServerListCtrl', ServerListCtrl);

  /**
   * @ngInject
   */
  function ServerListCtrl(ServerList) {
    var vm = this;

    vm.list = ServerList();
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
