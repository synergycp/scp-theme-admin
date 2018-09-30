(function () {
  'use strict';

  var MODAL = {
    CREATE: {
      TPL: 'app/user/client/modal/create.modal.html',
      CTRL: 'CreateClientModalCtrl',
    },
  };

  angular
    .module('app.user.client')
    .service('ClientUsersModals', ClientUsersModals)
    ;

  /**
   *
   * @ngInject
   */
  function ClientUsersModals(RouteHelpers, Modal, $uibModal) {
    var modals = this;
    modals.openCreate = openCreate;

    ////////

    function openCreate() {
      return $uibModal.open({
        templateUrl: MODAL.CREATE.TPL,
        controller: MODAL.CREATE.CTRL,
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
        },
      });
    }
  }

})();
