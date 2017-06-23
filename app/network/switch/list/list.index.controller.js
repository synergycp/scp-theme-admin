(function () {
  'use strict';

  angular
    .module('app.network.switch.list')
    .controller('SwitchIndexCtrl', SwitchIndexCtrl);

  /**
   * @ngInject
   */
  function SwitchIndexCtrl(SwitchList, ListFilter, Todo) {
    var vm = this;

    vm.list = SwitchList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'switch',
      },
    };

    activate();

    ////////////

    function activate() {
    }

    function create() {
      vm.list.create(vm.create.getData())
        .then(Todo.refresh);
    }
  }
})();
