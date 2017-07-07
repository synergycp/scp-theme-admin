(function () {
  'use strict';

  angular
    .module('app.system.package.list')
    .component('packageTable', {
      require: {
        list: '\^list',
      },
      bindings: {
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
    table.toggleEnabled = toggleEnabled;

    ///////////

    function init() {
    }

    function toggleEnabled() {
      console.log('toggleEnabled');
    }
  }
})();
