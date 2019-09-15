(function () {
  'use strict';

  angular
    .module('app.system.version')
    .service('VersionService', makeVersionService);

  /**
   * @ngInject
   * @return {{}}
   */
  function makeVersionService(Api, $q) {
    var VersionService = {};
    var subscribers = [];
    var cachedCurrent;
    var cachedLatest;
    var cachedReleaseChannel;
    var apiFetchResult;

    VersionService.onChange = onChange;
    VersionService.getCurrent = getCurrent;
    VersionService.getLatest = getLatest;
    VersionService.getReleaseChannel = getReleaseChannel;
    VersionService.refresh = refresh;

    return VersionService;

    ///////////

    function getCurrent() {
      if (cachedCurrent !== undefined) {
        return $q.when(cachedCurrent);
      }

      return (apiFetchResult || refresh()).then(function () {
        return cachedCurrent;
      });
    }

    function getLatest() {
      if (cachedLatest !== undefined) {
        return $q.when(cachedLatest);
      }

      return (apiFetchResult || refresh()).then(function () {
        return cachedLatest;
      });
    }

    function getReleaseChannel() {
      if (cachedReleaseChannel !== undefined) {
        return $q.when(cachedReleaseChannel);
      }

      return (apiFetchResult || refresh()).then(function () {
        return cachedReleaseChannel;
      });
    }

    function refresh() {
      return apiFetchResult = Api.one('version')
        .get()
        .then(storeResponse)
        .then(triggerChange);
    }

    function storeResponse(response) {
      cachedCurrent = response.current;
      cachedLatest = response.latest;
      cachedReleaseChannel = response.channel;
      return response;
    }

    /**
     * @param callback
     * @return {{}}
     */
    function onChange(callback) {
      subscribers.push(callback);
      return VersionService;
    }

    function triggerChange(passthrough) {
      _.map(subscribers, function (callback) {
        callback();
      });
      return passthrough;
    }
  }
})();
