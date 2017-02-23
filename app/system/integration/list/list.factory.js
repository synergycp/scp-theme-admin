(function () {
  'use strict';

  angular
    .module('app.system.integration.list')
    .factory('IntegrationList', IntegrationListFactory);

  /**
   * IntegrationList Factory
   *
   * @ngInject
   */
  function IntegrationListFactory (List, ListConfirm) {
    return function () {
      var list = List('integration');
      list.confirm = ListConfirm(list, 'system.integration.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
