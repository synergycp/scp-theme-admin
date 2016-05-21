(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .factory('List', ListFactory);

  /**
   * List Factory
   *
   * @ngInject
   */
  function ListFactory (Api) {
    return function (path) {
      return new List(path, Api);
    };
  }

  function List(path, Api) {
    var list = this;
    var $api = Api.all(path);

    list.items = [];
    list.load = load;

    function load() {
      getItems()
        .then(storeItems)
        ;
    }

    function getItems () {
      return $api.getList();
    }

    function storeItems(response) {
      list.items = response;
    }
  }
})();
