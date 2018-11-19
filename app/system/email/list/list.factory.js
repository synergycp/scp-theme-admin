(function () {
  'use strict';

  angular
    .module('app.system.email.list')
    .factory('EmailList', EmailListFactory);

  /**
   * EmailList Factory
   *
   * @ngInject
   */
  function EmailListFactory (List, ListConfirm) {
    return function () {
      var list = List('email/template');
      list.confirm = ListConfirm(list, 'system.email.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
