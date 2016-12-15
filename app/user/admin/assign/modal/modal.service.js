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
    var $api = Api.all('server');

    AdminAssignModal.delete = remove;

    //////////

    function remove(admins) {
      var modal = $uibModal.open({
        templateUrl: 'app/user/admin/assign/modal/modal.delete.html',
        controller: 'AdminAssignDeleteModalCtrl',
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
          admins: function () {
            return admins;
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
