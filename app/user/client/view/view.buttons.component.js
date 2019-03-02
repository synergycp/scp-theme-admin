(function () {
  'use strict';

  angular
    .module('app.user.client.view')
    .component('clientButtons', {
      require: {},
      bindings: {
        client: '=',
      },
      controller: 'ClientButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/user/client/view/view.buttons.html'
    })
    .controller('ClientButtonsCtrl', ClientButtonsCtrl);

  /**
   * @ngInject
   */
  function ClientButtonsCtrl(Client, ClientList, Loader, $state, Alert) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.loginAs = loginAs;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        ClientList()
          .confirm
          .delete([buttons.client])
          .result.then(transferToList)
      );
    }

    function loginAs() {
      Alert.warning('Logging in as client... If the page doesn\'t open please disable your popup blocker on this application.');
      return buttons.loader.during(
        Client.loginAs(buttons.client.id)
      );
    }

    function transferToList() {
      $state.go('app.user.client.list');
    }
  }
})();
