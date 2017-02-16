(function () {
  'use strict';

  angular
    .module('app.pxe')
    .controller('PxeDriverViewCtrl', PxeDriverViewCtrl)
    ;

  /**
   * View Driver Controller
   *
   * @ngInject
   */
  function PxeDriverViewCtrl(Edit, $stateParams, ApiUpload) {
    var vm = this;

    vm.edit = Edit('pxe/driver/'+$stateParams.id);
    vm.edit.input = {};
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'pxe.driver',
        target_id: $stateParams.id,
      },
    };

    activate();

    //////////

    function activate() {
      vm.edit.getCurrent();
    }

    function submit() {
      var data = vm.edit.getData();
      vm.edit.loader.during(
        ApiUpload.patch(
          'pxe/driver/'+$stateParams.id,
          data.driver,
          data
        )
      );
    }
  }
})();
