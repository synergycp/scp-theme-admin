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
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'client',
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
