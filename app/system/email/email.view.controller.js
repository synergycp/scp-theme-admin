(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('EmailViewCtrl', EmailViewCtrl)
    ;

  /**
   * View Email Controller
   *
   * @ngInject
   */
  function EmailViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('email/template/'+$stateParams.id);
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'email-template',
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
