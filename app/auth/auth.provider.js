(function() {
  'use strict';

  angular
    .module('app.auth')
    .provider('Auth', AuthProvider)
    ;

  function AuthProvider() {
    var authProvider = this;
    var internalApi = {
      $get: getService
    };

    return internalApi;

    /**
     * @ngInject
     */
    function getService(Api, ApiKey, $state) {
      return new Auth(Api, ApiKey, $state);
    }

    /**
     * Auth Service
     */
    function Auth(Api, ApiKey, $state) {
      var auth = this;
      var keys = Api.all('key');

      auth.logout = logout;
      auth.login = login;

      /////////////

      /**
       * Revoke this API Key,
       * so that all of the user's browser instances
       * are logged out of the application.
       *
       * @return {promise}
       */
      function logout() {
        return keys.one(""+ApiKey.id()).remove()
          .then(ApiKey.delete, ApiKey.delete)
          .then(transferToLogin, transferToLogin)
          ;
      }

      /**
       * @param object credentials
       * @param boolean remember
       */
      function login(credentials, remember) {
        return keys
          .post(credentials)
          .then(handleResponse.bind(null, remember))
          .then(transferToApp)
          ;
      }

      function handleResponse(remember, response) {
        ApiKey.set(response, remember);
      }

      function transferToApp() {
        // TODO: attempted URL
        $state.go('app.dashboard');
      }

      function transferToLogin() {
        $state.go('auth.login');
      }
    }
  }
}());
