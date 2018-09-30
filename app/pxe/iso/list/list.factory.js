(function () {
  'use strict';

  angular
    .module('app.pxe.iso')
    .factory('IsoList', IsoListFactory);

  /**
   * IsoList Factory
   *
   * @ngInject
   */
  function IsoListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/iso');
      list.confirm = ListConfirm(list, 'pxe.iso.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
