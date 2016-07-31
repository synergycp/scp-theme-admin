(function () {
  'use strict';

  angular
    .module('app.hardware.server.buttons')
    .component('serverButtons', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/hardware/server/buttons/buttons.html'
    })
    .controller('ServerButtonsCtrl', ServerButtonsCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerButtonsCtrl(
    ServerAssignModal,
    ServerAssign,
    Loader,
    Client,
    $state
  ) {
    var buttons = this;

    buttons.loader = Loader();

    buttons.setActive = setActive;
    buttons.loginAsClient = loginAsClient;
    buttons.wipe = confirmWipe;
    buttons.delete = confirmDelete;
    buttons.$onInit = init;

    //////////

    function init() {
    }

    function setActive(active) {
      if (!active) {
        return confirmSuspend();
      }

      return buttons.loader.during(
        ServerAssign.unsuspend([buttons.server])
          .then(fireChangeEvent)
      );
    }

    function loginAsClient() {
      var ssoData = {
        view_type: 'server',
        view_id: buttons.server.id,
      };
      var client = buttons.server.access.client;

      return buttons.loader.during(
        Client.loginAs(client.id, ssoData)
      );
    }

    function confirmWipe() {
      return buttons.loader.during(
        ServerAssignModal
          .wipe([buttons.server])
          .then(storeChanges)
          .then(fireChangeEvent)
      );
    }

    function confirmSuspend() {
      return buttons.loader.during(
        ServerAssignModal
          .suspend([buttons.server])
          .then(fireChangeEvent)
      );
    }

    function confirmDelete() {
      return buttons.loader.during(
        ServerAssignModal
          .delete([buttons.server])
          .then(transferToList)
      );
    }

    function fireChangeEvent(arg) {
      buttons.server.fire('change', buttons.server);

      return arg;
    }

    function storeChanges(response) {
      _.assign(buttons.server, response, {
        one: buttons.server.one,
        all: buttons.server.all,
        getRestangularUrl: buttons.server.getRestangularUrl,
      });
    }

    function transferToList() {
      $state.go('app.hardware.server.list');
    }
  }
})();
