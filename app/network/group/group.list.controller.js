(function () {
  'use strict';

  angular
    .module('app.network')
    .controller('GroupListCtrl', GroupListCtrl);

  /**
   * @ngInject
   */
  function GroupListCtrl(List) {
    var vm = this;

    vm.list = List('group');
    vm.list.bulk.add('Delete', vm.list.delete);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'group',
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
