(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('SpeedListCtrl', SpeedListCtrl);

  /**
   * @ngInject
   */
  function SpeedListCtrl(SpeedList) {
    var vm = this;

    vm.list = SpeedList();
    vm.create = {
      input: {},
      submit: create,
    };
    vm.logs = {
      filter: {
        target_type: 'port-speed',
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
