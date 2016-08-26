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
      sref: "#",
      icon: "fa fa-sitemap",
    }).item({
      translate: "nav.network.ENTITIES",
      sref: "app.network.entity",
    }).item({
      translate: "nav.network.GROUPS",
      sref: "app.network.group",
    });
  }
})();
