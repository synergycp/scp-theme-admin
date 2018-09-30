(function () {
  'use strict';

  angular
    .module('app.pxe.file.list')
    .component('pxeFileTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showActions: '=?',
      },
      controller: 'ServerTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/file/list/list.table.html'
    })
    .controller('ServerTableCtrl', ServerTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showActions: true,
      });
    }
  }
})();
