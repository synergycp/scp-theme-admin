(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('IsoListCtrl', IsoListCtrl);

  /**
   * @ngInject
   */
  function IsoListCtrl(List) {
    var vm = this;

    vm.list = List('pxe/iso');
    vm.list.bulk.add('Delete', vm.list.delete);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'iso',
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
