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
    // Private variables
    var select = this;
    var filter = {};

    // Public variables
    select.items = [];
    select.selected = null;
    select.isMulti = false;

    // Public methods
    select.load = load;
    select.notSelected = notSelected;
    select.multi = multi;
    select.filter = setFilter;

    //////////

    function load(search) {
      return $api
        .getList(_.assign({}, filter, { q: search }))
        .then(store)
        ;
    }

    function setFilter(newFilters) {
      _.assign(filter, newFilters);

      return select;
    }

    function multi() {
      select.isMulti = true;
      select.selected = [];

      return select;
    }

    function store(items) {
      _.setContents(select.items, items);
    }

    function notSelected(item) {
      return select.isMulti ?
        !_.some(select.selected, {id: item.id}) :
        select.selected != item
        ;
    }
  }
})();
