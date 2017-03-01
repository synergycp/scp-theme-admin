(function () {
  'use strict';

  angular
    .module('app.system.integration.list')
    .component('integrationTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showKeys: '=?',
        showPermissions: '=?',
        showClients: '=?',
        showServers: '=?',
        showActions: '=?',
      },
      controller: 'IntegrationTableCtrl as table',
      transclude: true,
      templateUrl: 'app/system/integration/list/list.table.html'
    })
    .controller('IntegrationTableCtrl', IntegrationTableCtrl)
    ;

  /**
   * @ngInject
   */
  function IntegrationTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showKeys: true,
        showPermissions: true,
        showClients: true,
        showServers: true,
        showActions: true,
      });
    }
  }
})();
