(function () {
  'use strict';

  angular
    .module('app.network')
    .controller('EntityViewCtrl', EntityViewCtrl)
    ;

  /**
   * View Entity Controller
   *
   * @ngInject
   */
  function EntityViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('entity/'+$stateParams.id);
    vm.input = {};
    vm.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'entity',
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
