(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('SwitchListCtrl', SwitchListCtrl);

  /**
   * @ngInject
   */
  function SwitchListCtrl(SwitchList) {
    var vm = this;

    vm.list = SwitchList();

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
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
