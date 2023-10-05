(function () {
  'use strict';

  angular
    .module('app.system.notification.list')
    .component('notificationTable', {
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
      controller: 'NotificationTableCtrl as table',
      transclude: true,
      templateUrl: 'app/system/notification/list/list.table.html'
    })
    .controller('NotificationTableCtrl', NotificationTableCtrl)
    ;

  /**
   * @ngInject
   */
  function NotificationTableCtrl() {
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
