(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('AdminListCtrl', AdminListCtrl);

  /*@ngInject*/
  function AdminListCtrl(List) {
    var vm = this;

    vm.list = List('admin');
    vm.list.bulk.add('Delete', vm.list.delete);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'admin',
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
