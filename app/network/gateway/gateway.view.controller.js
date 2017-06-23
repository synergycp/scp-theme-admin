(function () {
  'use strict';

  angular
    .module('app.network')
    .controller('GatewayViewCtrl', GatewayViewCtrl)
    ;

  /**
   * View Gateway Controller
   *
   * @ngInject
   */
  function GatewayViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('forward/gateway/'+$stateParams.id);
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'forward.gateway',
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
