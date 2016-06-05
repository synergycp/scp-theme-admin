(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('ProfileViewCtrl', ProfileViewCtrl)
    ;

  /**
   * View Profile Controller
   *
   * @ngInject
   */
  function ProfileViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('pxe/profile/'+$stateParams.id);
    vm.input = {};
    vm.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'pxe-profile',
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
