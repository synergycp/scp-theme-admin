(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PreseedIndexCtrl', PreseedIndexCtrl);

  /**
   * @ngInject
   */
  function PreseedIndexCtrl(PreseedList) {
    var vm = this;

    vm.list = PreseedList();

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
