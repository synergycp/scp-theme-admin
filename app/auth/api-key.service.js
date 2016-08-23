(function () {
  'use strict';

  angular
    .module('app.auth')
    .service('ApiKey', ApiKey);

  /**
   * ApiKey Service
   *
   * @ngInject
   */
  function ApiKey($localStorage) {
    var apiKey = this;
    var _apiKey = getApiKeyFromStorage();

    apiKey.get = getApiKey;
    apiKey.set = setApiKey;
    apiKey.id = getApiKeyId;
    apiKey.delete = deleteApiKey;
    apiKey.owner = getOwner;

    function getApiKey() {
      return _apiKey ? _apiKey.key : null;
    }

    function getOwner() {
      return _apiKey ? _apiKey.owner : null;
    }

    function getApiKeyId() {
      return _apiKey ? _apiKey.id : null;
    }

    function setApiKey(key, remember) {
      _apiKey = {
        id: key.id,
        key: key.key,
        owner: {
          id: key.owner.id,
          name: key.owner.name,
        },
      };

      storage().apiKey = _apiKey;
    }

    function getApiKeyFromStorage() {
      return storage().apiKey || null;
    }

    /**
     * Delete this API Key from local storage.
     */
    function deleteApiKey() {
      _apiKey = null;

      delete storage().apiKey;
    }

    function storage() {
      $localStorage.admin = $localStorage.admin || {};

      return $localStorage.admin;
    }
  }
})();
