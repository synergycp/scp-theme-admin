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
      icon: "fa fa-sitemap",
    }).item({
      translate: "nav.network.ENTITIES",
      sref: "app.network.entity.list",
    }).item({
      translate: "nav.network.GROUPS",
      sref: "app.network.group.list",
    });
  }
})();
