(function () {
  'use strict';

  angular
    .module('app.pxe.driver')
    .factory('PxeDriverList', PxeDriverListFactory);

  /**
   * PxeProfileList Factory
   *
   * @ngInject
   */
  function PxeDriverListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/driver');
      list.confirm = ListConfirm(list, 'pxe.driver.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
