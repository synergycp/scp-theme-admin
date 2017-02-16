(function () {
  'use strict';

  angular
    .module('app.hardware.server.view.manage')
    .factory('ManageServer.Panel.TopTabs', TopTabsPanel)
  ;

  function TopTabsPanel(ServerManage, ServerManagePanelBandwidth) {
    return ServerManagePanelBandwidth(
      ServerManage.getServer(),
      ServerManage.getControllerScope()
    );
  }
})();
