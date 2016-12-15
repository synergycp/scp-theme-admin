(function () {
  'use strict';

  angular
    .module('app.user.admin')
    .controller('AdminAssignDeleteModalCtrl', AdminAssignDeleteModalCtrl)
    ;

  /**
   * AdminAssignDeleteModalCtrl Controller
   *
   * @ngInject
   */
  function AdminAssignDeleteModalCtrl(admins) {
    var modal = this;

    modal.admins = admins;

    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      return modal.$close();
    }
  }
})();
