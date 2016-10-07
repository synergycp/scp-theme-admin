(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ShellViewCtrl', ShellViewCtrl)
    ;

  /**
   * View Shell Controller
   *
   * @ngInject
   */
  function ShellViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('pxe/shell/'+$stateParams.id);
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'pxe.shell-script',
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
