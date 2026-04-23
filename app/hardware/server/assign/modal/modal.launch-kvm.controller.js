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
    modal.consoleType = Select('server/console/type');
    modal.consoleType.load();
    modal.submit = submit;

    //////////

    function submit() {
      var launchKvm = modal.launchKvm.getSelected('value') || null;
      var data = {
        launch_kvm: launchKvm,
      };

      if (launchKvm === 'containerized_console') {
        data.console_type = modal.consoleType.getSelected('value') || null;
      } else {
        data.console_type = null;
      }

      return modal.$close(data);
    }
  }
})();
