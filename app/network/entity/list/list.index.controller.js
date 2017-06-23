(function () {
  'use strict';

  angular
    .module('app.network.entity.list')
    .controller('EntityIndexCtrl', EntityIndexCtrl);

  /**
   * @ngInject
   */
  function EntityIndexCtrl(ListFilter, EntityList, Todo) {
    var vm = this;

    vm.list = EntityList();
    vm.filters = ListFilter(vm.list);
    vm.create = {
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'entity',
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
