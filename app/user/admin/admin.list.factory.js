(function () {
  'use strict';

  angular
    .module('app.user.admin')
    .factory('AdminList', AdminListFactory);

  /**
   * AdminList Factory
   *
   * @ngInject
   */
  function AdminListFactory (List, ListConfirm) {
    return function () {
      var list = List('admin');
      var confirm = ListConfirm(list, 'admin.modal.delete');

      list.bulk.add('Delete', confirm.delete);

      return list;
    };
  }
})();
