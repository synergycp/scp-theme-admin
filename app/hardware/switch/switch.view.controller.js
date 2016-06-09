(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('SwitchViewCtrl', SwitchViewCtrl)
    ;

  /**
   * View Switch Controller
   *
   * @ngInject
   */
  function SwitchViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('switch/'+$stateParams.id);
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'switch',
        target_id: $stateParams.id,
      },
    };


    activate();

    //////////

    function activate() {
      vm.edit.getCurrent(vm.edit.input);
    }

    function submit() {
      vm.edit.patch(vm.edit.getData());
    }
  }
})();
