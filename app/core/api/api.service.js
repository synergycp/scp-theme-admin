(function () {
  'use strict';

  angular
    .module('app.core.api')
    .factory('Api', ApiService);

  /**
   * Proxy for the Restangular service.
   *
   * Responsibilities:
   * 	 - Handle API Error Responses
   *
   * @ngInject
   */
  function ApiService(ApiKey, Restangular, $state, Alert) {
    // TODO: move to config
    var typeMap = {
      'success': 'success',
      'danger': 'danger',
      'warning': 'warning',
      'info': 'info'
    };

    activate();

    return proxy();

    function activate() {
      Restangular.addErrorInterceptor(apiErrorInterceptor);
      Restangular.addFullRequestInterceptor(apiRequestAddApiKey);
      Restangular.addResponseInterceptor(displayMessages);
      Restangular.addErrorInterceptor(apiErrorTranslator);
    }

    function proxy() {
      return Restangular;
    }

    function apiErrorInterceptor(response) {
      switch (response.status) {
      case 401:
        sendToLogin();
        return false;
      }
    }

    function sendToLogin() {
      $state.go('auth.login');
    }

    function apiErrorTranslator(response, deferred, responseHandler) {
      angular.forEach(response.data.messages, displayMessage);
    }

    function displayMessages(data, operation, what, url, response, deferred) {
      angular.forEach(data.messages, displayMessage);

      return data;
    }

    function displayMessage(message) {
      var type = typeMap[message.type];

      Alert[type](message.text);
    }

    function apiRequestAddApiKey(element, operation, what, url, headers, params) {
      params.key = getApiKey();

      return {
        params: params
      };
    }

    /**
     * @return {string} Api Key
     */
    function getApiKey() {
      return ApiKey.get() || "";
    }
  }
}());
