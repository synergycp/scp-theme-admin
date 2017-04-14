(function () {
  'use strict';

  angular
    .module('app.pxe.shell.list')
    .component('shellTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showActions: '=?',
      },
      controller: 'ShellTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/shell/list/list.table.html'
    })
    .controller('ShellTableCtrl', ShellTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ShellTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
          showName: true,
          showDescription: true,
          showActions: true,
      });
    }
  }
})();
