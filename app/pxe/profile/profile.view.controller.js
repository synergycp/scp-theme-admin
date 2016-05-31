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
    var edit = Edit('pxe/profile/'+$stateParams.id);

    vm.input = {
      name: '',
      billing_id: '',
      preseed: {
        id: null,
        name: '',
      },
      boot_script: {
        id: null,
        name: '',
      },
      iso: {
        id: null,
        name: '',
      },
      access_client: false,
    };
    vm.submit = submit;

    activate();

    //////////

    function activate() {
      edit.getCurrent(vm.input);
    }

    function submit() {
      edit.patch(getInputs());
    }

    function getInputs() {
      return vm.input;
    }
  }
})();
