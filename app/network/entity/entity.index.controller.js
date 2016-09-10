(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .controller('EntityIndexCtrl', EntityIndexCtrl);

  /**
   * @ngInject
   */
  function EntityIndexCtrl(ListFilter, EntityList) {
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
      vm.filters.change();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
