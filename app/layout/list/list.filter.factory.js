(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .factory('ListFilter', ListFilterFactory);

  /**
   * ListFilter Factory
   *
   * @ngInject
   */
  function ListFilterFactory () {
    return function (list) {
        return new ListFilter(list);
    };
  }

  function ListFilter (list) {
    var filter = this;

    filter.visible = false;
    filter.current = {};
    filter.change = syncFilters;

    //////////

    function syncFilters() {
      return list
        .filter(filter.current)
        .load()
        ;
    }
  }
})();
