(function() {
  'use strict';

  angular
    .module('app.auth')
    .provider('Auth', AuthProvider)
    ;

  function AuthProvider() {
    var authProvider = this;
    var loginType;
    var afterLoginState = 'app.dashboard';
    var internalApi = {
      $get: getService,
      setLoginType: setLoginType,
      getLoginType: getLoginType,
      setAfterLoginState: setAfterLoginState,
      getAfterLoginState: getAfterLoginState,
    };

    return internalApi;

    function setLoginType(type) {
      loginType = type;

      return internalApi;
    }

    function getLoginType() {
      return loginType;
    }

    function setAfterLoginState(state) {
      afterLoginState = state;

      return internalApi;
    }

    function getAfterLoginState() {
      return afterLoginState;
    }

    /**
     * @ngInject
     */
    function getService(Api, ApiKey, $state, _) {
      return new AuthService(Api, ApiKey, $state, _);
    }

    /**
     * Auth Service
     */
    function AuthService(Api, ApiKey, $state, _) {
      var Auth = this;
      var $keys = Api.all('key');

      Auth.logout = logout;
      Auth.login = login;
      Auth.user = user;
      Auth.getLoginType = getLoginTypeOrFail;

      /////////////

      function user() {
        return Api
          .all(Auth.getLoginType())
          .one(''+ApiKey.owner().id)
          ;
      }

      /**
       * Revoke this API Key,
       * so that all of the user's browser instances
       * are logged out of the application.
       *
       * @return {promise}
       */
      function logout() {
        return $keys
          .one(''+ApiKey.id())
          .remove()
          .then(ApiKey.delete, ApiKey.delete)
          .then(transferToLogin, transferToLogin)
          ;
      }

      /**
       * @param object credentials
       * @param boolean remember
       */
      function login(credentials, remember) {
        var data = _.assign({
          type: getLoginTypeOrFail(),
        }, credentials);

        return $keys
          .post(data)
          .then(handleResponse.bind(null, remember))
          .then(transferToApp)
          ;
      }

      function handleResponse(remember, response) {
        ApiKey.set(response, remember);
      }

      function transferToApp() {
        // TODO: attempted URL
        $state.go(afterLoginState);
      }

      function transferToLogin() {
        $state.go('auth.login');
      }

      function getLoginTypeOrFail() {
        if (!loginType) {
          throw new Error('Login type not configured on AuthProvider');
        }

        return loginType;
      }
    }
  }
}());
