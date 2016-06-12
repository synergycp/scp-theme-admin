(function () {
  'use strict';

  angular
    .module('app.core.api')
    .config(ApiConfigRestangular);

  /**
   * @ngInject
   */
  function ApiConfigRestangular(ApiProvider) {
    var url = '/';
    if (location.host.substr(0, 'localhost'.length) == 'localhost') {
      url = 'http://dev.synergycp.net/';
    }
    ApiProvider.setUrl(url);
    ApiProvider.addResponseInterceptor(apiResponseTranslator);

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
