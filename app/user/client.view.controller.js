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
  function ClientViewCtrl(Edit, $stateParams) {
    var vm = this;
    var edit = Edit('client/'+$stateParams.id);

    vm.input = {
      email: '',
      password: '',
      first: '',
      last: '',
      billing_id: ''
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
