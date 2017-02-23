(function () {
  'use strict';

  var DASHBOARD = {
    translate: "nav.DASH",
    sref: "app.dashboard",
    icon: "fa fa-home",
    order: 0,
    alwaysShow: false,
  };

  angular
    .module('app.dashboard')
    .run(NavConfig)
    ;

  /**
   * @ngInject
   */
  function NavConfig(Nav, Dashboard, $rootScope) {
    var group = Nav.group('dashboard', DASHBOARD);

    Dashboard.provider.on('repo:add', checkShow);
    Dashboard.provider.on('repo:remove', checkShow);

    checkShow();

    function checkShow() {
      $rootScope.$evalAsync(function () {
        group.options.alwaysShow = Dashboard.provider.repos.length > 0;
      });
    }
  }
})();
