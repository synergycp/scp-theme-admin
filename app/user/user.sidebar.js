(function () {
  'use strict';

  angular
    .module('app.system')
    .config(SystemNavConfig)
    ;

  /**
   * @ngInject
   */
  function SystemNavConfig(NavProvider) {
    NavProvider.group('user', {
      translate: "nav.USERS",
      sref: "#",
      icon: "fa fa-user",
    }).item({
      text: "Clients",
      sref: "app.user.client",
    }).item({
      text: "Administrators",
      sref: "app.user.admin",
    });
  }
})();
