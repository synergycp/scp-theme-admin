(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('SpeedViewCtrl', SpeedViewCtrl)
    ;

  /**
   * View Speed Controller
   *
   * @ngInject
   */
  function SpeedViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('port-speed/'+$stateParams.id);
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'port-speed',
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
