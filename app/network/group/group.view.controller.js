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
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'group',
        target_id: $stateParams.id,
      },
    };


    activate();

    //////////

    function activate() {
      vm.edit.getCurrent(vm.edit.input);
    }

    function submit() {
      vm.edit.patch(vm.edit.getData());
    }
  }
})();
