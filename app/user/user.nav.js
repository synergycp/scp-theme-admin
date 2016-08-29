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
      sref: "app.user.client.list",
      icon: "fa fa-user",
    }).item({
      text: "Clients",
      sref: "app.user.client.list",
    }).item({
      text: "Administrators",
      sref: "app.user.admin.list",
    });
  }
})();
