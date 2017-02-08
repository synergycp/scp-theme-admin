(function () {
  'use strict';

  var PANELS = 'app/hardware/server/view/manage/panel';

  angular
    .module('app.hardware.server.view.manage')
    .config(configurePanels)
  ;

  /**
   * @ngInject
   */
  function configurePanels(ServerManageProvider, _) {
    ServerManageProvider.panels.top.add('ManageServer.Panel.TopTabs');

    _.each([
      {
        templateUrl: PANELS + '/panel.hardware.html',
      }, {
        templateUrl: PANELS + '/panel.assign.html',
      }, {
        templateUrl: PANELS + '/panel.notes.html',
      }, {
        templateUrl: PANELS + '/panel.logs.html',
      }
    ], ServerManageProvider.panels.left.add);

    _.each([
      {
        templateUrl: PANELS + '/panel.alerts.html',
      }, {
        templateUrl: PANELS + '/panel.control.switch.html',
      }, {
        templateUrl: PANELS + '/panel.control.ipmi.html',
      }, {
        templateUrl: PANELS + '/panel.os-reload.html',
      }, {
        templateUrl: PANELS + '/panel.buttons.html',
      }
    ], ServerManageProvider.panels.right.add);
    // TODO: ServerManageProvider.topTabs.addRepo('ManageServer.Panel.Bandwidth');
  }
})();
