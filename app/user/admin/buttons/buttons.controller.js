(function () {
  'use strict';

  angular
    .module('app.user.admin.buttons')
    .controller('AdminButtonsCtrl', AdminButtonsCtrl)
    ;

  /**
   * @ngInject
   */
  function AdminButtonsCtrl(
    AdminAssignModal,
    Loader,
    $state,
    _
  ) {
    var buttons = this;

    buttons.loader = Loader();

    buttons.delete = confirmDelete;
    buttons.$onInit = init;

    //////////

    function init() {
      _.defaults(buttons, {
        showEdit: true,
        showManage: true,
      });
    }

    function confirmDelete() {
      return buttons.loader.during(
        AdminAssignModal
          .delete([buttons.admin])
          .then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.user.admin.list');
    }

    
  }
})();
