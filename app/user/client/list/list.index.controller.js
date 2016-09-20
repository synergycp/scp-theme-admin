(function () {
  'use strict';

  angular
    .module('app.user.client.list')
    .controller('ClientIndexCtrl', ClientIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function ClientIndexCtrl(ClientList, ListFilter) {
    var vm = this;

    vm.list = ClientList();
    vm.filters = ListFilter(vm.list);

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
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
