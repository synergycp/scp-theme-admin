(function () {
  'use strict';

  angular
    .module('app.pxe.dhcp')
    .factory('PxeDhcpList', PxeDhcpListFactory);

  /**
   * PxeProfileList Factory
   *
   * @ngInject
   */
  function PxeDhcpListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/dhcp');
      list.confirm = ListConfirm(list, 'pxe.dhcp.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
