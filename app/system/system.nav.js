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
    NavProvider.group('system', {
      translate: "nav.SYSTEM",
      sref: "app.system.setting.list",
      icon: "fa fa-wrench",
    }).item({
      text: "Settings",
      sref: "app.system.setting.list",
    }).item({
      text: "Emails",
      sref: "app.system.email.list",
    }).item({
      text: "Logs",
      sref: "app.system.log.list",
    });
  }
})();
