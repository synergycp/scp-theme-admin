(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('IsoListCtrl', IsoListCtrl);

  /**
   * @ngInject
   */
  function IsoListCtrl(IsoList) {
    var vm = this;

    vm.list = IsoList();

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
