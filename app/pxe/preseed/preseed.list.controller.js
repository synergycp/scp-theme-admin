(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PreseedListCtrl', PreseedListCtrl);

  /**
   * @ngInject
   */
  function PreseedListCtrl(List) {
    var vm = this;

    vm.list = List('pxe/preseed');
    vm.list.bulk.add('Delete', vm.list.delete);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe-preseed',
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
