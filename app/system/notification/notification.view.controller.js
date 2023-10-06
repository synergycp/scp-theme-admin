(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('NotificationViewCtrl', NotificationViewCtrl)
    ;

  /**
   * View notification Controller
   *
   * @ngInject
   */
  function NotificationViewCtrl(Edit, $stateParams) {
    var vm = this;

    vm.edit = Edit('notification/'+$stateParams.id);
    vm.edit.submit = submit;

    vm.logs = {
      filter: {
        target_type: 'notification',
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
