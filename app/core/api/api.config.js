(function () {
  'use strict';

  angular
    .module('app.core.api')
    .config(ApiConfigRestangular);

  /**
   * @ngInject
   */
  function ApiConfigRestangular(RestangularProvider, $stateProvider) {
    var url = '/';
    if (location.host == 'localhost:3000') {
      url = 'http://dev.synergycp.net/';
    }
    RestangularProvider.setBaseUrl(url+'api');
    RestangularProvider.addResponseInterceptor(apiResponseTranslator);

    ///////////

    function apiResponseTranslator(data, operation, what, url, response, deferred) {
      var extractedData = data.data || {};
      extractedData.messages = data.messages;

      if (operation === "getList") {
        var meta = extractedData;
        extractedData = extractedData.data;
        extractedData.meta = meta;
      }

      extractedData.response = data;
      return extractedData;
    }
  }
}());
