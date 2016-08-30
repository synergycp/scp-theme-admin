(function () {
  'use strict';

  angular
    .module('app.user.client')
    .component('clientButtons', {
      require: {},
      bindings: {
        client: '=',
      },
      controller: 'ClientButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/user/client/client.buttons.html'
    })
    .controller('ClientButtonsCtrl', ClientButtonsCtrl);

  /**
   * @ngInject
   */
  function ClientButtonsCtrl(Client, ClientList, Loader, $state) {
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
          .then(transferToList)
      );
    }

    function loginAs() {
      return buttons.loader.during(
        Client.loginAs(buttons.client.id)
      );
    }

    function transferToList() {
      $state.go('app.user.client.list');
    }
  }
})();
