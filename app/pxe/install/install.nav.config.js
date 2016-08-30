(function () {
  'use strict';

  angular
    .module('app.system')
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
  function PxeInstallNavRefresher(PxeInstallNav, $interval, Api) {
    var $installs = Api.all('server/*/install');

    $interval(load, PxeInstallNav.refreshInterval);
    load();

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
