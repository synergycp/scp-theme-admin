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
    var edit = Edit('pxe/preseed/'+$stateParams.id);

    vm.input = {
      name: '',
      description: '',
      body: '',
      is_installable: false,
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
