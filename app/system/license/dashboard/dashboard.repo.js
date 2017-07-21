(function () {
  'use strict';

  angular
    .module('app.system.license.dashboard')
    .service('LicenseDashboardRepo', LicenseDashboardRepo)
    .run(addLicenseDashboardRepo)
    ;

  /**
   * @ngInject
   */
  function addLicenseDashboardRepo(Dashboard) {
    Dashboard.add('LicenseDashboardRepo');
  }

  /**
   * LicenseDashboardRepo
   *
   * @ngInject
   */
  function LicenseDashboardRepo(
    Api,
    EventEmitter,
    LicenseDashboardPanel,
    _
  ) {
    var repo = this;

    repo.all = all;
    EventEmitter().bindTo(repo);

    ///////////

    function all() {
      repo.fire(
        'item',
        LicenseDashboardPanel()
      );
    }
  }
})();
