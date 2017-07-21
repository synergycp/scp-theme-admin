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
    Api
  ) {
    return function () {
      return new LicenseDashboardPanel(
        RouteHelpers,
        EventEmitter,
        Loader,
        Api
      );
    };
  }

  function LicenseDashboardPanel(
    RouteHelpers,
    EventEmitter,
    Loader,
    Api
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

    //////////

    function onRefresh() {
      return panel.context.loader.during(
        Api
        .all('license/refresh')
        .post()
        .then(store)
      );
    }

    function load() {
      return Api
        .one('license')
        .get()
        .then(store)
    }

    function store(res) {
      panel.context.license.key = res.key;
      panel.context.license.servers = res.max_servers;
    }
  }
})();
