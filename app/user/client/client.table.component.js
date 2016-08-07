(function () {
  'use strict';

  angular
    .module('app.user.client')
    .component('clientTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showEmail: '=?',
        showServerCount: '=?',
        showActions: '=?',
      },
      controller: 'ClientTableCtrl as table',
      transclude: true,
      templateUrl: 'app/user/client/client.table.html'
    })
    .controller('ClientTableCtrl', ClientTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ClientTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showEmail: true,
        showServerCount: true,
        showActions: true,
      });
    }
  }
})();
