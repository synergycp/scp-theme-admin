(function () {
  'use strict';

  angular
    .module('app.pxe.preseed.list')
    .factory('PreseedList', PreseedListFactory);

  /**
   * PreseedList Factory
   *
   * @ngInject
   */
  function PreseedListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/preseed');
      list.confirm = ListConfirm(list, 'pxe.preseed.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
