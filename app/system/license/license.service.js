(function () {
  "use strict";

  angular
    .module("app.system.license")
    .service("LicenseService", makeLicenseService);

  /**
   * @ngInject
   * @return {{}}
   */
  function makeLicenseService(Api, $q) {
    var LicenseService = {};
    var subscribers = [];
    var cachedLicense = {
      serversInUse: null,
      key: null,
      serversAllowed: null,
      // [BA-100] Renewal state, as milliseconds since the epoch (or null).
      dueAt: null,
      isOverdue: false,
      isInGracePeriod: false,
      stopsAt: null,
    };

    LicenseService.onChange = onChange;
    LicenseService.getCanAddMoreServers = getCanAddMoreServers;
    LicenseService.getSkipCache = getSkipCache;
    LicenseService.getLicense = getLicense;
    LicenseService.refresh = refresh;

    return LicenseService;

    ///////////

    function getLicense() {
      if (
        cachedLicense.serversAllowed !== null &&
        cachedLicense.serversInUse !== null
      ) {
        return $q.when(cachedLicense);
      }

      return getSkipCache();
    }

    function refresh() {
      return Api.one("license/refresh")
        .post()
        .then(storeLicense)
        .then(triggerChange)
        .then(returnCachedLicense);
    }

    function getSkipCache() {
      return Api.one("license")
        .get()
        .then(storeLicense)
        .then(triggerChange)
        .then(returnCachedLicense);
    }

    function returnCachedLicense() {
      return cachedLicense;
    }

    /**
     * @param callback
     * @return {{}}
     */
    function onChange(callback) {
      subscribers.push(callback);
      return LicenseService;
    }

    /**
     * @return {Promise}
     */
    function getCanAddMoreServers() {
      return getLicense().then(canAddMoreServers);
    }

    function triggerChange() {
      _.map(subscribers, function (callback) {
        callback();
      });
    }

    function storeLicense(res) {
      cachedLicense.key = res.key;
      cachedLicense.serversAllowed = res.max_servers;
      cachedLicense.serversInUse = res.in_use_servers;
      cachedLicense.dueAt = res.due_at ? res.due_at.unix * 1000 : null;
      cachedLicense.isOverdue = !!res.is_overdue;
      cachedLicense.isInGracePeriod = !!res.is_in_grace_period;
      cachedLicense.stopsAt = res.stops_at ? res.stops_at.unix * 1000 : null;
    }

    /**
     * @return {boolean}
     */
    function canAddMoreServers() {
      return cachedLicense.serversAllowed > cachedLicense.serversInUse;
    }
  }
})();
