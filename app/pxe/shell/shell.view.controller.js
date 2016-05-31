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
    var edit = Edit('pxe/shell/'+$stateParams.id);

    vm.input = {
      name: '',
      description: '',
      body: '',  
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
