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
  function AdminViewCtrl(Edit, $stateParams) {
    var vm = this;
    var edit = Edit('admin/'+$stateParams.id);

    vm.input = {};
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
