(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .factory('EntityList', EntityListFactory);

  /**
   * EntityList Factory
   *
   * @ngInject
   */
  function EntityListFactory (List) {
    return function () {
      var list = List('entity');

      list.bulk.add('Delete', list.delete);

      return list;
    };
  }
})();
