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
        name: 'hardware',
        templateUrl: PANELS + '/panel.hardware.html',
      }, {
        name: 'assignments',
        templateUrl: PANELS + '/panel.assign.html',
      }, {
        name: 'notes',
        templateUrl: PANELS + '/panel.notes.html',
      }, {
        name: 'logs',
        templateUrl: PANELS + '/panel.logs.html',
      },
    ], ServerManageProvider.panels.left.add);

    _.each([
      {
        name: 'alerts',
        templateUrl: PANELS + '/panel.alerts.html',
      }, {
        name: 'control.switch',
        templateUrl: PANELS + '/panel.control.switch.html',
      }, {
        name: 'control.ipmi',
        templateUrl: PANELS + '/panel.control.ipmi.html',
      }, {
        name: 'control.os-reload',
        templateUrl: PANELS + '/panel.os-reload.html',
      }, {
        name: 'buttons',
        templateUrl: PANELS + '/panel.buttons.html',
      },
    ], ServerManageProvider.panels.right.add);
    // TODO: ServerManageProvider.topTabs.addRepo('ManageServer.Panel.Bandwidth');
  }
})();
