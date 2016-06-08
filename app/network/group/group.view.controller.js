(function () {
  'use strict';

  angular
    .module('app.network')
    .controller('GroupViewCtrl', GroupViewCtrl)
    ;

  /**
   * View Group Controller
   *
   * @ngInject
   */
  function GroupViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('group/'+$stateParams.id);
    vm.input = {};
    vm.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'group',
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
