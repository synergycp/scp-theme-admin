(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .constant('ServerInventoryNav', {
      text: "Server Inventory",
      sref: "app.hardware.server.inventory",
      alertType: 'info',
      propagateAlerts: false,
      refreshInterval: 30000,
    })
    .constant('ServerListNav', {
      text: "Servers",
      sref: "app.hardware.server.list",
    })
    .run(navRefresher)
    ;

  /**
   * @ngInject
   */
  function navRefresher(ServerInventoryNav, Permission, $interval, Api, Auth) {
    var $inventory = Api.all('server');
    var interval;

    Auth.whileLoggedIn(checkPerms, stopChecking);

    function checkPerms() {
      Permission
        .ifHas('server.in_inventory.read')
        .then(startChecking)
      ;
    }

    ///////////

    function startChecking() {
      stopChecking();
      load();

      interval = $interval(load, ServerInventoryNav.refreshInterval);
    }

    function stopChecking() {
      if (interval) {
        $interval.cancel(interval);
      }
    }

    function load() {
      return $inventory
        .getList({
          per_page: 1,
          available: true,
        })
        .then(function(items) {
          ServerInventoryNav.alert = items.meta.total;
          ServerInventoryNav.group.syncAlerts();
        });
    }
  }
})();
