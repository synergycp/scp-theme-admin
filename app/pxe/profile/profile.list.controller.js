(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ProfileListCtrl', ProfileListCtrl);

  /**
   * @ngInject
   */
  function ProfileListCtrl(PxeProfileList) {
    var vm = this;

    vm.list = PxeProfileList();

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'pxe-profile',
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
