(function () {
  'use strict';

  angular
    .module('app.network.console.server.list')
    .factory('ConsoleServerList', ConsoleServerListFactory)
    ;

  /**
   * @ngInject
   */
  function ConsoleServerListFactory(ListConfirm, List) {
    return function () {
      var list = List('console/server');
      list.confirm = ListConfirm(list, 'console.server.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
