(function () {
  'use strict';

  angular
    .module('app.system.email')
    .factory('EmailList', EmailListFactory);

  /**
   * EmailList Factory
   *
   * @ngInject
   */
  function EmailListFactory (List, ListConfirm) {
    return function () {
      var list = List('email/template');
      var confirm = ListConfirm(list, 'system.email.modal.delete');

      list.bulk.add('Delete', confirm.delete);

      return list;
    };
  }
})();
