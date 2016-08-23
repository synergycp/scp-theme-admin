(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('LogoutCtrl', LogoutCtrl)
    ;

  /**
   * Logout Controller
   *
   * @ngInject
   */
  function LogoutCtrl(Auth) {
    var vm = this;

    activate();

    //////////

    function activate() {
      Auth.logout();
    }
  }
})();
