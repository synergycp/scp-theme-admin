(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('ClientListCtrl', ClientListCtrl);

  /**
   * @ngInject
   */
  function ClientListCtrl(List) {
    var vm = this;

    vm.list = List('client');
    vm.list.bulk.add('Delete', vm.list.delete);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'client',
      },
    };

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.input);
    }
  }
})();
