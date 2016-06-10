(function () {
  'use strict';

  angular
    .module('app.layout.utils')
    .factory('Select', SelectFactory);

  /**
   * Select Factory
   *
   * @ngInject
   */
  function SelectFactory (Api, _) {
    return function (path) {
        return new Select(Api.all(path), _);
    };
  }

  function Select ($api, _) {
    var select = this;

    select.items = [];
    select.selected = null;
    select.load = load;

    //////////

    function load(search) {
      return $api
        .getList({ q: search })
        .then(store)
        ;
    }

    function store(items) {
      _.setContents(select.items, items);
    }
  }
})();
