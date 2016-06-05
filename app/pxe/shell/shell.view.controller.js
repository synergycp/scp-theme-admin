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

    vm.input = {};
    vm.submit = submit;

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
