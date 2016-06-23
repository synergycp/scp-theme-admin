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
      var proxy = wrapRestangular(Restangular);
      proxy.baseUrl = baseUrl;
      proxy.apiUrl = apiUrl;

      function wrapRestangular(result) {
        result.patch = request(result.patch);
        result.delete = request(result.delete);
        result.get = request(result.get);
        result.post = request(result.post);
        result.put = request(result.put);
        result.all = wrap(result.all);
        result.one = wrap(result.one);

        return result;

        function wrap(method) {
          return function () {
            var result = method.apply(result, arguments);

            return wrapRestangular(result);
          };
        }

        function request(method) {
          return function () {
            return method.apply(result, arguments)
              .then(displayMessages);
          };
        }
      }

      activate();

      return proxy;

      function activate() {
        Restangular.addErrorInterceptor(apiErrorInterceptor);
        Restangular.addErrorInterceptor(apiErrorTranslator);
        Restangular.addFullRequestInterceptor(apiRequestAddApiKey);
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
        angular.forEach(response.messages, displayMessage);

        return response;
      }

      function displayMessage(message) {
        var type = typeMap[message.type];

        Alert[type](message.text);
      }

      function apiRequestAddApiKey(element, operation, what, url, headers, params) {
        params.key = getApiKey();

        return {
          params: params,
        };
      }

      /**
       * @return {string} Api Key
       */
      function getApiKey() {
        return ApiKey.get() || "";
      }
    }
  }
}());
