(function () {
  'use strict';

  angular
    .module('app.user.admin.list')
    .component('adminTable', {
      require: {
        list: '\^list',
      },
      bindings: {
      },
      controller: 'AdminTableCtrl as table',
      transclude: true,
      templateUrl: 'app/user/admin/list/list.table.html'
    })
    .controller('AdminTableCtrl', AdminTableCtrl)
    ;

  /**
   * @ngInject
   */
  function AdminTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
      });
    }
  }
})();
