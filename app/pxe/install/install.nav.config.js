(function () {
  'use strict';

  angular
    .module('app.pxe.install')
    .constant('PxeInstallNav', {
      text: "Installs",
      sref: "app.pxe.install.list",
      alertType: 'info',
      propagateAlerts: true,
      refreshInterval: 10000,
    })
    .run(PxeInstallNavRefresher)
    ;

  /**
   * @ngInject
   */
  function PxeInstallNavRefresher(PxeInstallNav, $interval, Api, Auth) {
    var $installs = Api.all('server/*/install');
    var interval;

    Auth.whileLoggedIn(startChecking, stopChecking);

    ///////////

    function startChecking() {
      stopChecking();
      load();

      interval = $interval(load, PxeInstallNav.refreshInterval);
    }

    function stopChecking() {
      if (interval) {
        $interval.cancel(interval);
      }
    }

    function load() {
      return $installs
        .getList({
          per_page: 1,
        })
        .then(function(items) {
          PxeInstallNav.alert = items.meta.total;
          PxeInstallNav.group.syncAlerts();
        });
    }
  }
})();
