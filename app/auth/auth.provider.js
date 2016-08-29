(function() {
  'use strict';

  var LOGIN_STATE = 'auth.login';

  angular
    .module('app.auth')
    .provider('Auth', AuthProvider)
    ;

  function AuthProvider() {
    var authProvider = this;
    var loginType;
    var afterLoginState = 'app.dashboard';
    var internalApi = {
      $get: AuthService,
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
     * Auth Service
     *
     * @ngInject
     */
    function AuthService(Api, ApiKey, $state, $location, $q, _) {
      var Auth = this;
      var $keys = Api.all('key');

      Auth.logout = logout;
      Auth.login = login;
      Auth.user = user;
      Auth.getLoginType = getLoginTypeOrFail;

      return Auth;

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
        var promise = $q.when(0);

        if (ApiKey.id()) {
          promise.then(function() {
            return $keys
              .one(''+ApiKey.id())
              .remove()
              ;
          });
        }

        return promise
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
        $location.url($state.params.next || '/');
      }

      function transferToLogin() {
        if ($state.current.name == LOGIN_STATE) {
          return;
        }

        $state.go(LOGIN_STATE, {
          next: $location.url(),
        });
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
