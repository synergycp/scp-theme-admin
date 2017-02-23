(function () {
  'use strict';

  angular
    .module('app.user.key.list')
    .factory('ApiKeyList', ApiKeyListFactory);

  /**
   * ApiKeyListFactory Factory
   *
   * @ngInject
   */
  function ApiKeyListFactory (List, ListConfirm) {
    return function (lang) {
      var list = List('key');
      list.confirm = ListConfirm(list, lang+'.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
