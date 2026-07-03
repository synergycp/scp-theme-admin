(function () {
  'use strict';

  angular
    .module('app.network.console.server.list')
    .component('consoleServerTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showHealth: '=?',
        showHostname: '=?',
        showActions: '=?',
      },
      controller: 'ConsoleServerTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/console/server/list/list.table.html'
    })
    .controller('ConsoleServerTableCtrl', ConsoleServerTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ConsoleServerTableCtrl() {
    var table = this;

    table.$onInit = init;

    function init() {
      _.defaults(table, {
        showName: true,
        showHealth: true,
        showHostname: true,
        showActions: true,
      });
    }
  }
})();
