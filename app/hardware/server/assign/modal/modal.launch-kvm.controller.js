(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerAssignLaunchKvmModalCtrl', ServerAssignLaunchKvmModalCtrl)
    ;

  /**
   * ServerAssignLaunchKvmModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignLaunchKvmModalCtrl(Select, servers) {
    var modal = this;

    modal.servers = servers;
    modal.launchKvm = Select('server/launch/kvm');
    modal.launchKvm.load();
    modal.submit = submit;

    //////////

    function submit() {
      return modal.$close({
        launch_kvm: modal.launchKvm.getSelected('value') || null,
      });
    }
  }
})();
