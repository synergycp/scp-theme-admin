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
    ApiProvider.$get = ApiService;

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
     * @ngInject
     */
    function ApiService(ApiKey, Restangular, $state, Alert, $injector) {
      var proxy = wrapRestangular(Restangular);
      proxy.baseUrl = baseUrl;
      proxy.apiUrl = apiUrl;
      proxy.wrap = wrapRestangular;

      function wrapRestangular(result) {
        if (!result || result.isWrapped) {
          return result;
        }

        result.isWrapped = true;
        result.getList = wrapList(result.getList);
        result.remove = request(result.remove);
        result.patch = request(result.patch);
        result.post = request(result.post);
        result.get = request(result.get);
        result.put = request(result.put);
        result.all = wrap(result.all);
        result.one = wrap(result.one);

        return result;

        function wrap(method) {
          return function () {
            return wrapRestangular(
              method.apply(result, arguments)
            );
          };
        }

        function request(method) {
          return function () {
            return method.apply(result, arguments)
              .then(wrapNested)
              .then(displayMessages)
              ;
          };
        }

        function wrapNested(response) {
          response.getList = result.getList;
          response.remove = result.remove;
          response.patch = result.patch;
          response.post = result.post;
          response.get = result.get;
          response.put = result.put;
          response.all = result.all;
          response.one = result.one;

          return wrapRestangular(response);
        }

        function wrapList(oldMethod) {
          return function() {
            return request(oldMethod)
              .apply(null, arguments)
              .then(setRestangularOnList)
              ;

            function setRestangularOnList(list) {
              _.each(list, wrapRestangular);

              return list;
            }
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
        $injector.get('Auth').logout();
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
        params = _.assign({
          key: getApiKey(),
        }, params);

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
