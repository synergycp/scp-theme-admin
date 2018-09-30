(function () {
  'use strict';

  angular
    .module('app.pxe.boot')
    .factory('PxeBootList', PxeBootListFactory);

  /**
   * PxeBootList Factory
   *
   * @ngInject
   */
  function PxeBootListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/template');
      list.confirm = ListConfirm(list, 'pxe.boot.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
