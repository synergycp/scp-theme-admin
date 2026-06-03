(function () {
  'use strict';

  angular
    .module('app.hardware.console.list')
    .factory('ConsoleSessionList', ConsoleSessionListFactory)
    ;

  /**
   * @ngInject
   */
  function ConsoleSessionListFactory(ListConfirm, List) {
    return function (filters) {
      var list = List('console/session');

      if (filters) {
        list.filter(filters);
      }

      list.confirm = ListConfirm(list, 'console.session.modal.delete');
      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
