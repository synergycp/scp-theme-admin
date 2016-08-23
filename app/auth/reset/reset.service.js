(function () {
  'use strict';

  angular
    .module('app.auth.reset')
    .service('PasswordReset', Service);

  /**
   * Password Reset Service
   *
   * @ngInject
   */
  function Service (Api, Auth) {
    var PasswordReset = this;
    var $resets = Api.all('auth/password-reset');

    PasswordReset.forgot = forgot;
    PasswordReset.reset = reset;

    //////////

    /**
     * @param object data
     */
    function forgot(data) {
      return $resets
        .post(data)
        .then(handleForgotResponse)
        ;
    }

    function handleForgotResponse() {
    }

    /**
     * @param object data
     */
    function reset(id, data) {
      return $resets
        .one(''+id)
        .patch(data)
        .then(handleResetResponse.bind(null, data))
        ;
    }

    function handleResetResponse(request, response) {
      var user = response.user;
      var credentials = {
        username: user.username,
        password: request.password,
      };

      return Auth.login(credentials, false);
    }
  }
})();
