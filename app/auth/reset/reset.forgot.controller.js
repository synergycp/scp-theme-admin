/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthResetForgotCtrl', AuthResetForgotCtrl);

  /**
   * @ngInject
   */
  function AuthResetForgotCtrl(PasswordReset, Alert, AuthProvider) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // Bound form data
      vm.email = '';
      vm.form = null;
      vm.submit = handleSubmit;
    }

    function handleSubmit() {
      if (!vm.form.$valid) {
        // set as dirty if the user click directly to login,
        // so we show the validation messages.
        vm.form.email.$dirty = true;

        return;
      }

      Alert.clear();

      return PasswordReset
        .forgot(formData())
        .catch(handleError);
    }

    function formData() {
      return {
        type: AuthProvider.getLoginType(),
        email: vm.email,
      };
    }

    function handleError(error) {
      console.error(error);
    }
  }
})();
