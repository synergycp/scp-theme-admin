(function () {
  'use strict';

  angular
    .module('app.pxe.file')
    .factory('PxeFileList', PxeFileListFactory);

  /**
   * PxeProfileList Factory
   *
   * @ngInject
   */
  function PxeFileListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/file');
      list.confirm = ListConfirm(list, 'pxe.file.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
