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
  function PxeFileListFactory (Api, List, ListConfirm) {
    return function () {
      var list = List('pxe/file');
      list.confirm = ListConfirm(list, 'pxe.file.modal.delete');

      list.bulk.add('Run health check', runHealthCheck);
      list.bulk.add('Delete', list.confirm.delete);

      function runHealthCheck(items) {
        return Api.all('pxe/file/health-check')
          .post({ids: _.map(items, 'id')})
          .then(list.load);
      }

      return list;
    };
  }
})();
