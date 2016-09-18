(function () {
  'use strict';

  angular
    .module('scp.core.api.url')
    .service('Url', UrlService)
    ;

  /**
   * Url Service
   *
   * @ngInject
   */
  function UrlService (_) {
    var Url = this;
    var mappings = [];

    Url.get = get;
    Url.map = map;

    //////////

    function get(apiUrl) {
      return _.reduce(mappings, reduceResult, null) ||
        unknown(apiUrl)
        ;

      function reduceResult (result, mapping) {
        return result || mapping.result(apiUrl);
      }
    }

    function unknown(apiUrl) {
      throw new Error('URL does not match any known URLs: ' + apiUrl);
    }

    function map(apiUrl, callback) {
      mappings.push(new Mapping(apiUrl, callback));
    }
  }

  function Mapping(url, callback) {
    var mapping = this;
    var re = new RegExp(url);

    mapping.result = result;

    /////////

    function result(apiUrl) {
      var matches = apiUrl.match(re);

      if (!matches) {
        return;
      }

      matches.shift();

      return callback.apply(mapping, matches);
    }
  }
})();
