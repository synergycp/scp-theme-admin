/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthLoginCtrl', AuthLoginCtrl);

  /**
   * @ngInject
   */
  function AuthLoginCtrl(Auth, Alert) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // Bound form data
      vm.account = {
        username: "",
        password: ""
      };
      vm.loginForm = null;

      vm.login = handleLoginForm;
    }

    function handleLoginForm() {
      if (!vm.loginForm.$valid) {
        // set as dirty if the user click directly to login,
        // so we show the validation messages.
        vm.loginForm.username.$dirty = vm.loginForm.password.$dirty = true;

        return;
      }

      Alert.clear();

      var remember = false; // TODO

      return Auth
        .login(credentials(), remember)
        .catch(handleError)
        ;
    }

    function credentials() {
      return {
        username: vm.account.username,
        password: vm.account.password
      };
    }

    function handleError(error) {
      console.error(error);
    }
  }
})();
