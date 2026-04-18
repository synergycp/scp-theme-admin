(function () {
  'use strict';

  angular
    .module('app.hardware.console.list')
    .component('consoleSessionTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showCreator: '=?',
        showConsoleServer: '=?',
      },
      controller: 'ConsoleSessionTableCtrl as table',
      transclude: true,
      templateUrl: 'app/hardware/console/list/list.table.html'
    })
    .controller('ConsoleSessionTableCtrl', ConsoleSessionTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ConsoleSessionTableCtrl() {
    var table = this;

    table.$onInit = init;

    function init() {
      _.defaults(table, {
        showCreator: false,
        showConsoleServer: true,
      });
    }
  }
})();
