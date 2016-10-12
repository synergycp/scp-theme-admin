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
    NavProvider.group('network', {
      translate: "nav.network.TITLE",
      sref: "app.network.entity.list",
      icon: "fa fa-sitemap",
    }).item({
      translate: "nav.network.ENTITIES",
      sref: "app.network.entity.list",
    }).item({
      translate: "nav.network.GROUPS",
      sref: "app.network.group.list",
    })
    .item({
      text: "Switches",
      sref: "app.network.switch.list",
    })
    .item({
      text: "Switch Port Speeds",
      sref: "app.network.switch.speed.list",
    })
    ;
  }
})();
