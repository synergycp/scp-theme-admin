(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('PackageViewCtrl', PackageViewCtrl)
    ;

  /**
   * View Package Controller
   *
   * @ngInject
   */
  function PackageViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('package/'+$stateParams.id);
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'package',
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
