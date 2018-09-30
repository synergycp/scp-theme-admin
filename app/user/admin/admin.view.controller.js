(function () {
  'use strict';

  angular
    .module('app.user')
    .controller('AdminViewCtrl', AdminViewCtrl)
    ;

  /**
   * AdminView Controller
   *
   * @ngInject
   */
  function AdminViewCtrl(Edit, EventEmitter, $stateParams) {
    var vm = this;

    vm.edit = Edit('admin/'+$stateParams.id);
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'admin',
        target_id: $stateParams.id,
      },
    };

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent();
    }

    function submit() {
      vm.edit.patch(vm.edit.getData());
    }
  }
})();
