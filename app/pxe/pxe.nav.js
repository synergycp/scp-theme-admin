(function () {
  'use strict';

  angular
    .module('app.system')
    .config(SystemNavConfig)
    ;

  /**
   * @ngInject
   */
  function SystemNavConfig(NavProvider, PxeInstallNav) {
    NavProvider
      .group('pxe', {
        translate: "nav.pxe.TITLE",
        sref: "app.pxe.install.list",
        icon: "fa fa-upload",
      })
      .item(PxeInstallNav)
      .item({
        text: "Preseeds",
        sref: "app.pxe.preseed.list",
      })
      .item({
        text: "Profiles",
        sref: "app.pxe.profile.list",
      })
      .item({
        text: "Shell Scripts",
        sref: "app.pxe.shell.list",
      })
      .item({
        text: "Boot Scripts",
        sref: "app.pxe.boot.list",
      })
      .item({
        text: "ISO Manager",
        sref: "app.pxe.iso.list",
      })
      ;
  }
})();
