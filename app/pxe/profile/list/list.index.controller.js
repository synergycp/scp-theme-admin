(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ProfileIndexCtrl', ProfileIndexCtrl);

  /**
   * @ngInject
   */
  function ProfileIndexCtrl(PxeProfileList, ListFilter) {
    var vm = this;

    vm.list = PxeProfileList();
    vm.filters = ListFilter(vm.list);

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
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
