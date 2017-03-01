(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('IntegrationViewCtrl', IntegrationViewCtrl)
    ;

  /**
   * View Integration Controller
   *
   * @ngInject
   */
  function IntegrationViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('integration/'+$stateParams.id);
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'api.integration',
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
