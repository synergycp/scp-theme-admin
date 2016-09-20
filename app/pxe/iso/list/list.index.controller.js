(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('IsoIndexCtrl', IsoIndexCtrl);

  /**
   * @ngInject
   */
  function IsoIndexCtrl(IsoList, ListFilter) {
    var vm = this;

    vm.list = IsoList();
    vm.filters = ListFilter(vm.list);

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
