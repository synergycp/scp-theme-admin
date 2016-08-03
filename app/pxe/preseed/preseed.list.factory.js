(function () {
  'use strict';

  angular
    .module('app.pxe.preseed')
    .factory('PreseedList', PreseedListFactory);

  /**
   * PreseedList Factory
   *
   * @ngInject
   */
  function PreseedListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/preseed');
      var confirm = ListConfirm(list, 'pxe.preseed.modal.delete');

      list.bulk.add('Delete', confirm.delete);

      return list;
    };
  }
})();
