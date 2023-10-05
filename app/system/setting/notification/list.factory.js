(function () {
  'use strict';

  angular
    .module('app.system.setting')
    .factory('NotificationList', NotificationListFactory);

  /**
   * AdminList Factory
   *
   * @ngInject
   */
  function NotificationListFactory (List, ListConfirm) {
    return function () {
      var list = List('Notification');
      var confirm = ListConfirm(list, 'admin.modal.delete');

      list.bulk.add('Delete', confirm.delete);

      return list;
    };
  }
})();
