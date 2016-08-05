(function () {
  'use strict';

  angular
    .module('app.pxe.shell')
    .factory('PxeShellList', PxeShellListFactory);

  /**
   * PxeShellList Factory
   *
   * @ngInject
   */
  function PxeShellListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/shell');
      var confirm = ListConfirm(list, 'pxe.shell.modal.delete');

      list.bulk.add('Delete', confirm.delete);

      return list;
    };
  }
})();
