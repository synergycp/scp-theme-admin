(function () {
  'use strict';

  angular
    .module('app.system.email.list')
    .component('emailTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showReserved: '=?',
        showIpEntities: '=?',
        showServers: '=?',
        showActions: '=?',
      },
      controller: 'EmailTableCtrl as table',
      transclude: true,
      templateUrl: 'app/system/email/list/list.table.html'
    })
    .controller('EmailTableCtrl', EmailTableCtrl)
    ;

  /**
   * @ngInject
   */
  function EmailTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showReserved: true,
        showIpEntities: true,
        showServers: true,
        showActions: true,
      });
    }
  }
})();
