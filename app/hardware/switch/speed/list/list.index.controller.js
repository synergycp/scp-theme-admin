(function () {
  'use strict';

  angular
    .module('app.hardware.switch.speed.list')
    .controller('SwitchSpeedIndexCtrl', SwitchSpeedIndexCtrl);

  /**
   * @ngInject
   */
  function SwitchSpeedIndexCtrl(SwitchSpeedList, ListFilter) {
    var vm = this;

    vm.list = SwitchSpeedList();
    vm.filters = ListFilter(vm.list);

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
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
