(function () {
  'use strict';

  angular
    .module('app.system.integration.key')
    .controller('IntegrationKeyViewCtrl', IntegrationKeyViewCtrl)
  ;

  /**
   * @ngInject
   */
  function IntegrationKeyViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('key/'+$stateParams.key);
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'api.integration',
        target_id: $stateParams.id,
      },
    };

    vm.integrationId = $stateParams.id;

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
