(function () {
  'use strict';

  angular
    .module('app.hardware')
    .factory('ServerList', ServerListFactory);

  /**
   * ServerList Factory
   *
   * @ngInject
   */
  function ServerListFactory (_, List, $stateParams) {
    return function () {
      var list = List('server').filter({
        hub: $stateParams.switch,
        group: $stateParams.group,
        client: $stateParams.client,
      });
      list.bulk.add('Delete', list.delete);

      return list;
    };
  }
})();
