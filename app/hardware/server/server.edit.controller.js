(function () {
  'use strict';

  angular
    .module('app.hardware')
    .controller('ServerEditCtrl', ServerEditCtrl)
    ;

  /**
   * View Server Controller
   *
   * @ngInject
   */
  function ServerEditCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('server/'+$stateParams.id);
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'server',
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
