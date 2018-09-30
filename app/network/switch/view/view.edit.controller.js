(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('SwitchEditCtrl', SwitchEditCtrl)
    ;

  /**
   * Edit Switch Controller
   *
   * @ngInject
   */
  function SwitchEditCtrl(Edit, $stateParams) {
    var vm = this;

    vm.target = {
      id: $stateParams.id,
    };

    vm.edit = Edit('switch/'+$stateParams.id);
    vm.edit.submit = submit;
    vm.edit.on('load', storeCurrent);

    vm.logs = {
      filter: {
        target_type: 'switch',
        target_id: $stateParams.id,
      },
    };

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent();
    }

    function storeCurrent(response) {
      _.assign(vm.target, response);
    }

    function submit() {
      vm.edit.patch(vm.edit.getData());
    }
  }
})();
