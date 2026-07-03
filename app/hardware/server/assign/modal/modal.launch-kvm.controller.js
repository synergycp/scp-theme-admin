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
  function ServerAssignLaunchKvmModalCtrl(Select, Api, servers) {
    var modal = this;

    modal.servers = servers;
    modal.launchKvm = Select('server/launch/kvm');
    modal.launchKvm.load();
    modal.consoleImage = { items: [], selected: null };
    modal.consoleTag = { items: [], selected: null };
    modal.onLaunchKvmSelected = function () {
      modal.consoleImage.selected = null;
      modal.consoleTag.selected = null;
      modal.consoleTag.items = [];
    };
    modal.onConsoleImageSelected = function () {
      modal.consoleTag.selected = null;
      modal.consoleTag.items =
        (modal.consoleImage.selected && modal.consoleImage.selected.tags) || [];
    };
    Api.one('server/console/type').get().then(function (response) {
      modal.consoleImage.items = response.images || [];
    });
    modal.submit = submit;

    //////////

    function submit() {
      var launchKvm = modal.launchKvm.getSelected('value') || null;
      var data = {
        launch_kvm: launchKvm,
      };

      if (launchKvm === 'containerized_console') {
        var img = modal.consoleImage.selected;
        var tag = modal.consoleTag.selected;
        data.console_type = img && tag ? img.value + ':' + tag.value : null;
      } else {
        data.console_type = null;
      }

      return modal.$close(data);
    }
  }
})();
