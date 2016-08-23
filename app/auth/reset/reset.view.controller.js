/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthResetViewCtrl', AuthResetViewCtrl)
    ;

  /**
   * @ngInject
   */
  function AuthResetViewCtrl(PasswordReset, Alert, $stateParams) {
    var vm = this;

    activate();

    ////////////////

    function activate() {
      // Bound form data
      vm.password = '';
      vm.confirm = '';
      vm.form = null;
      vm.submit = handleSubmit;
    }

    function handleSubmit() {
      if (!vm.form.$valid) {
        // set as dirty if the user click directly to login,
        // so we show the validation messages.
        vm.form.password.$dirty = vm.form.confirm.$dirty = true;

        return;
      }

      Alert.clear();
      PasswordReset
        .reset($stateParams.id, formData())
        .catch(handleError)
        ;
    }

    function formData() {
      return {
        password: vm.password,
        token: $stateParams.token,
      };
    }

    function handleError(error) {
      console.error(error);
    }
  }
})();
