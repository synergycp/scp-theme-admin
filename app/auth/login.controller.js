/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginController', AuthLoginController);

  /**
   * @ngInject
   */
  function AuthLoginController(Auth, Alert) {
    var vm = this;

    vm.type = 'admin';

    activate();

    ////////////////

    function activate() {
      // Bound form data
      vm.account = {
        username: "",
        password: ""
      };
      vm.loginForm = null;

      // Error message
      vm.authMsg = '';

      vm.login = handleLoginForm;
    }

    function handleLoginForm() {
      vm.authMsg = '';

      if (!vm.loginForm.$valid) {
        // set as dirty if the user click directly to login,
        // so we show the validation messages.
        vm.loginForm.username.$dirty = vm.loginForm.password.$dirty = true;

        return;
      }

      Alert.clear();

      var remember = false; // TODO

      Auth.login(credentials(), remember)
        .catch(handleError);
    }

    function credentials() {
      return {
        type: vm.type,
        username: vm.account.username,
        password: vm.account.password
      };
    }

    function handleError(error) {
      console.error(error);
    }
  }
})();
