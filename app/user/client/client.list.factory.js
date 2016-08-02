(function () {
  'use strict';

  angular
    .module('app.user.client')
    .factory('ClientList', ClientListFactory);

  /**
   * ClientList Factory
   *
   * @ngInject
   */
  function ClientListFactory (List) {
    return function () {
      var list = List('client');

      list.bulk.add('Delete', list.delete);

      return list;
    };
  }
})();
