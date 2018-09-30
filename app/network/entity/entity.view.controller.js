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
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'entity',
        target_id: $stateParams.id,
      },
    };

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent();
    }

    function submit() {
      vm.edit.patch(vm.edit.getData());
    }
  }
})();
