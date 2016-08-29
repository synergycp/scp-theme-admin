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
  function LogoutCtrl(Auth, $previousState, $state) {
    var vm = this;

    activate();

    //////////

    function activate() {
      var previous = $previousState.get();

      Auth.logout().then(transferToLogin);

      function transferToLogin() {
        $state.go('auth.login', {
          next: getNextUrl(),
        });
      }

      function getNextUrl() {
        return $state
          .href(previous.state, previous.params)
          .substr(1)
          ;
      }
    }
  }
})();
