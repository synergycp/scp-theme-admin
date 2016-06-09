(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('SwitchListCtrl', SwitchListCtrl);

  /**
   * @ngInject
   */
  function SwitchListCtrl(List) {
    var vm = this;

    vm.list = List('switch');
    vm.list.bulk.add('Delete', vm.list.delete);

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
