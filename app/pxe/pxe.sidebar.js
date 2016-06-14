(function () {
  'use strict';

  angular
    .module('app.system')
    .config(SystemSidebarConfig)
    ;

  /**
   * @ngInject
   */
  function SystemSidebarConfig(SidebarProvider) {
    SidebarProvider.group('pxe', {
      translate: "sidebar.pxe.TITLE",
      sref: "app.pxe.install",
      icon: "fa fa-upload",
    }).item({
      text: "Installs",
      sref: "app.pxe.install",
    })
    .item({
      text: "Preseeds",
      sref: "app.pxe.preseed",
    })
    .item({
      text: "Profiles",
      sref: "app.pxe.profile",
    })
    .item({
      text: "Shell Scripts",
      sref: "app.pxe.shell",
    })
    .item({
      text: "Boot Scripts",
      sref: "app.pxe.boot",
    })
    .item({
      text: "ISO Manager",
      sref: "app.pxe.iso",
    })
    ;
  }
})();
