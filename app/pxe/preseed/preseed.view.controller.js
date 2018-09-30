(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PreseedViewCtrl', PreseedViewCtrl)
    ;

  /**
   * View Preseed Controller
   *
   * @ngInject
   */
  function PreseedViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('pxe/preseed/'+$stateParams.id);
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'pxe.preseed',
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
