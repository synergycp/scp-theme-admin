(function () {
  'use strict';

  angular
    .module('app.network.switch.port')
    .factory('PortBulk', PortBulkFactory);

  /**
   * PortBulk Factory
   *
   * @ngInject
   */
  function PortBulkFactory(ListConfirm) {
    return function (list) {
      var confirm = ListConfirm(list, 'switch.port.list.modal.delete');

      list.bulk.add('Delete', confirm.delete);

      return list;
    };
  }
})();