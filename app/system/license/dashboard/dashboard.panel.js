(function () {
  'use strict';

  var DIR = 'system/license/dashboard/';

  angular
    .module('app.system.license.dashboard')
    .factory('LicenseDashboardPanel', LicenseDashboardPanelFactory);

  /**
   * LicenseDashboardPanel Factory
   *
   * @ngInject
   */
  function LicenseDashboardPanelFactory(
    RouteHelpers,
    EventEmitter,
    Loader,
    LicenseService,
    $q
  ) {
    return function () {
      return new LicenseDashboardPanel(
        RouteHelpers,
        EventEmitter,
        Loader,
        LicenseService,
        $q
      );
    };
  }

  function LicenseDashboardPanel(
    RouteHelpers,
    EventEmitter,
    Loader,
    LicenseService,
    $q
  ) {
    var panel = this;

    panel.templateUrl = RouteHelpers.basepath(DIR + 'dashboard.panel.html');
    panel.context = {
      license: {},
      refresh: onRefresh,
      loader: Loader(),
    };
    EventEmitter().bindTo(panel);

    RouteHelpers.loadLang('license');
    load();

    LicenseService.onChange(load);

    //////////

    function onRefresh() {
      return panel.context.loader.during(
        $q.all([
          LicenseService.refresh(),
          LicenseService.getSkipCache(),
        ])
      );
    }

    function load() {
      return LicenseService.getLicense()
        .then(store);
    }

    function store(license) {
      panel.context.serversInUse = license.serversInUse;
      panel.context.license.key = license.key;
      panel.context.license.servers = license.serversAllowed;
    }
  }
})();
