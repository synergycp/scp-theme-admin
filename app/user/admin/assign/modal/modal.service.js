(function () {
  'use strict';

  angular
    .module('app.user.admin')
    .service('AdminAssignModal', AdminAssignModal);

  /**
   * AdminAssignModal Service
   *
   * @ngInject
   */
  function AdminAssignModal ($uibModal, $q, Api) {
    var AdminAssignModal = this;
    var $api = Api.all('admin');

    AdminAssignModal.delete = remove;

    //////////

    function remove(admins) {
      var modal = $uibModal.open({
        templateUrl: 'app/user/admin/assign/modal/modal.delete.html',
        controller: 'ModalConfirmCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          items: function () {
            return admins;
          },
          lang: function () {
            return "admin.modal.delete";
          },
          inputs: function () { 
            return function(){}; // refactor this. What is actually 'inputs'?
          },
          data: function () {
            return function(){};
          },
        },
      });

      return modal.result
        .then($bulk(admins).remove);
    }

    function $bulk(admins) {
      var adminIds = _.map(admins, 'id').join(',');

      return $api.one(adminIds);
    }
  }
})();
