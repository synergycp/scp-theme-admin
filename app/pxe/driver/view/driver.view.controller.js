(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeDriverViewCtrl', PxeDriverViewCtrl)
    ;

  /**
   * View Driver Controller
   *
   * @ngInject
   */
  function PxeDriverViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('pxe/driver/'+$stateParams.id);
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'pxe.driver',
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
