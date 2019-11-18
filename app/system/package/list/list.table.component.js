(function () {
  'use strict';

  angular
    .module('app.system.package.list')
    .component('packageTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showStatus: '=?',
        showVersion: '=?',
        showActions: '=?',
      },
      controller: 'PackageTableCtrl as table',
      transclude: true,
      templateUrl: 'app/system/package/list/list.table.html'
    })
    .controller('PackageTableCtrl', PackageTableCtrl)
    ;

  /**
   * @ngInject
   */
  function PackageTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showStatus: true,
        showVersion: true,
        showActions: true,
      });
    }
  }
})();
