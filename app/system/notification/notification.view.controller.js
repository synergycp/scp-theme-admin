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
  function NotificationViewCtrl(Edit, $stateParams, Api) {
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
      const data = vm.edit.getData();
      const url = `/notification/${$stateParams.id}/event`
      Api.all(url)
      .post(data.eventsRq)
      .then(function () {
        vm.edit.patch(data.notificationRq);
      })
      
    }
  }
})();
