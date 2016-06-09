(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('ServerListCtrl', ServerListCtrl);

  /**
   * @ngInject
   */
  function ServerListCtrl(List, $stateParams) {
    var vm = this;

    vm.list = List('server').filter({
      hub: $stateParams.switch,
      group: $stateParams.group,
      client: $stateParams.client,
    });
    vm.list.bulk.add('Delete', vm.list.delete);

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
