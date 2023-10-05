(function () {
  'use strict';

  angular
    .module('app.system.setting')
    .component('notificationTable_X', {
      controller: 'NotificationbleCtrl as table',
      transclude: true,
      templateUrl: 'app/system/setting/notification/list.table.html'
    })
    .controller('NotificationbleCtrl', NotificationbleCtrl)
    ;

  /**
   * @ngInject
   */
  function NotificationbleCtrl(NotificationList) {
    var vm = this;
    vm.list = NotificationList()
    .setPaginationAndSortToUrl();
    console.log(vm.list);
  }
})();
