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
    Api,
    $q
  ) {
    return function () {
      return new LicenseDashboardPanel(
        RouteHelpers,
        EventEmitter,
        Loader,
        Api,
        $q
      );
    };
  }

  function LicenseDashboardPanel(
    RouteHelpers,
    EventEmitter,
    Loader,
    Api,
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

    //////////

    function onRefresh() {
      return panel.context.loader.during(
        $q.all([
          Api
            .all('license/refresh')
            .post()
            .then(store),
          refreshServerCount(),
        ])
      );
    }

    function load() {
      return $q.all([
        Api
          .one('license')
          .get()
          .then(store),
        refreshServerCount(),
      ]);
    }

    function refreshServerCount() {
      return Api
        .one('server')
        .get({per_page: 1})
        .then(storeServerCount)
    }

    function storeServerCount(res) {
      panel.context.serversInUse = res.total;
    }

    function store(res) {
      panel.context.license.key = res.key;
      panel.context.license.servers = res.max_servers;
    }
  }
})();
