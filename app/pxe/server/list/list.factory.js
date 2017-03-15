(function () {
  'use strict';

  angular
    .module('app.pxe.server')
    .factory('PxeServerList', PxeServerListFactory);

  /**
   * PxeProfileList Factory
   *
   * @ngInject
   */
  function PxeServerListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/server');
      list.confirm = ListConfirm(list, 'pxe.server.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
