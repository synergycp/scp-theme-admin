(function () {
  'use strict';

  angular
    .module('app.pxe.preseed.list')
    .controller('PreseedIndexCtrl', PreseedIndexCtrl);

  /**
   * @ngInject
   */
  function PreseedIndexCtrl(PreseedList, ListFilter) {
    var vm = this;

    vm.list = PreseedList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe.preseed',
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
