(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeFileViewCtrl', PxeFileViewCtrl)
    ;

  /**
   * View Profile Controller
   *
   * @ngInject
   */
  function PxeFileViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('pxe/file/'+$stateParams.id);
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'pxe.file',
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
