(function () {
  'use strict';

  angular
    .module('app.system.notification.list')
    .factory('NotificationList', NotificationListFactory);

  /**
   * NotificationList Factory
   *
   * @ngInject
   */
  function NotificationListFactory (List, ListConfirm) {
    return function () {
      var list = List('notification');
      list.confirm = ListConfirm(list, 'system.notification.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
