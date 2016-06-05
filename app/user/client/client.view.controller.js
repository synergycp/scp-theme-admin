(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('ClientViewCtrl', ClientViewCtrl)
    ;

  /**
   * ClientView Controller
   *
   * @ngInject
   */
  function ClientViewCtrl(Edit, EventEmitter, $stateParams) {
    var vm = this;

    vm.edit = Edit('client/'+$stateParams.id);
    vm.input = {};
    vm.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'client',
        target_id: $stateParams.id,
      },
    };

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent(vm.input);
    }

    function submit() {
      vm.edit.patch(getInputs());
    }

    function getInputs() {
      return vm.input;
    }
  }
})();
