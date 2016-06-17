(function () {
  'use strict';

  angular
    .module('app.core.api')
    .provider('Api', ApiProviderFactory);

  /**
   * @ngInject
   */
  function ApiProviderFactory(RestangularProvider) {
    var ApiProvider = this;
    var typeMap = {
      'success': 'success',
      'danger': 'danger',
      'warning': 'warning',
      'info': 'info'
    };
    ApiProvider.options = {
    };

    ApiProvider.baseUrl = baseUrl;
    ApiProvider.setUrl = setUrl;
    ApiProvider.addResponseInterceptor = RestangularProvider.addResponseInterceptor;
    ApiProvider.$get = makeApiService;

    /**
     * @ngInject
     */
    function makeApiService (ApiKey, Restangular, $state, Alert) {
      return new ApiService(ApiKey, Restangular, $state, Alert);
    }

    function setUrl(url) {
      ApiProvider.options.url = url;

      RestangularProvider.setBaseUrl(url+'/api');
    }

    function baseUrl() {
      return ApiProvider.options.url;
    }

    /**
     * Proxy for the Restangular service.
     *
     * Responsibilities:
     * 	 - Handle API Error Responses
     *
     * @ngInject
     */
    function ApiService(ApiKey, Restangular, $state, Alert) {
      var proxy = Restangular;
      proxy.baseUrl = baseUrl;
      proxy.apiUrl = apiUrl;
      proxy.patch = request(Restangular.patch);
      proxy.delete = request(Restangular.delete);
      proxy.get = request(Restangular.get);
      proxy.post = request(Restangular.post);
      proxy.put = request(Restangular.put);

      activate();

      return proxy;

      function activate() {
        Restangular.addErrorInterceptor(apiErrorInterceptor);
        Restangular.addFullRequestInterceptor(apiRequestAddApiKey);
        Restangular.addErrorInterceptor(apiErrorTranslator);
      }

      function apiUrl() {
        return baseUrl()+'/api';
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
        if (response.data) {
          return angular.forEach(response.data.messages, displayMessage);
        }

        displayMessage({
          type: 'danger',
          text: 'Invalid API Response'
        });
      }

      function displayMessages(response) {
        angular.forEach(response.data.messages, displayMessage);

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

      function request(method) {
        return function () {
          return method.apply(proxy, arguments)
            .then(displayMessages);
        };
      }
    }
  }
}());
