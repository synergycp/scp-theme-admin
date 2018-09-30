(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('BootViewCtrl', BootViewCtrl)
    ;

  /**
   * View Boot Controller
   *
   * @ngInject
   */
  function BootViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('pxe/template/'+$stateParams.id);
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'pxe.boot-script',
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
