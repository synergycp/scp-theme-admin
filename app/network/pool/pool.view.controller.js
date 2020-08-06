(function () {
  'use strict';

  angular
    .module('app.network')
    .controller('PoolViewCtrl', PoolViewCtrl)
    ;

  /**
   * View Pool Controller
   *
   * @ngInject
   */
  function PoolViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('entity/pool/'+$stateParams.id);
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'entity.pool',
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
