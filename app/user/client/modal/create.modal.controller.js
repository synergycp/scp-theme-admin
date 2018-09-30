(function () {
  'use strict';

  angular
    .module('app.user.client')
    .controller('CreateClientModalCtrl', CreateClientModalCtrl)
    ;

  /**
   * OsReloadModalConfirm Controller
   *
   * @ngInject
   */
  function CreateClientModalCtrl(ClientList) {
    var modal = this;

    modal.list = ClientList();
    
    modal.create = {
      input: {},
      submit: create,
    };

    activate();

    //////////

    function activate() {

    }

    function create() {
      modal.list.create(modal.create.getData()).then(function(user){
        modal.$close(user);
      });
    }
  }
})();
