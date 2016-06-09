(function () {
  'use strict';

  angular
    .module('app.network')
    .controller('EntityListCtrl', EntityListCtrl);

  /**
   * @ngInject
   */
  function EntityListCtrl(List, $stateParams) {
    var vm = this;

    vm.list = List('entity').filter({
      group: $stateParams.group,
    });
    vm.list.bulk.add('Delete', vm.list.delete);

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
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
