(function () {
  'use strict';

  angular
    .module('app.network.console.server')
    .controller('ConsoleServerViewCtrl', ConsoleServerViewCtrl)
    ;

  /**
   * @ngInject
   */
  function ConsoleServerViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('console/server/'+$stateParams.id);
    vm.edit.submit = submit;
    vm.logs = {
      filter: {
        target_type: 'console.server',
        target_id: $stateParams.id,
      },
    };

    activate();

    function activate() {
      vm.edit.getCurrent();
    }

    function submit() {
      vm.edit.patch(vm.edit.getData());
    }
  }
})();
