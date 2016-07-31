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
  function SelectFactory (Api, EventEmitter, _) {
    return function (path) {
        return new Select(Api.all(path), EventEmitter(), _);
    };
  }

  function Select ($api, event, _) {
    // Private variables
    var select = this;
    var filter = {};
    var defaultItems = [];
    var lastSearch;

    // Public variables
    select.items = [];
    select.selected = undefined;
    select.isMulti = false;

    // Public methods
    select.load = _.debounce(load, 10);
    select.refresh = refresh;
    select.notSelected = notSelected;
    select.multi = multi;
    select.filter = setFilter;
    select.clearFilter = clearFilter;
    select.fireChangeEvent = fireChangeEvent;
    select.getSelected = getSelected;
    select.addItem = addItem;
    select.clear = clear;
    event.bindTo(select);

    //////////

    function load(search) {
      lastSearch = search;

      return refresh();
    }

    function refresh() {
      return $api
        .getList(_.assign({}, filter, { q: lastSearch }))
        .then(store)
        ;
    }

    function clear() {
      var isChanged = !!select.selected;

      select.selected = undefined;

      if (isChanged) {
        select.fireChangeEvent();
      }
    }

    function getSelected(attr) {
      return (select.selected || {})[attr] || undefined;
    }

    function addItem(item) {
      defaultItems.push(item);
      select.items.push(item);

      return select;
    }

    function setFilter(newFilters) {
      _.assign(filter, newFilters);

      return select;
    }

    function fireChangeEvent() {
      select.fire('change', select.selected);
    }

    function clearFilter(key) {
      delete filter[key];

      return select;
    }

    function multi() {
      select.isMulti = true;
      select.selected = [];

      return select;
    }

    function store(items) {
      _.setContents(select.items, defaultItems);
      _.each(items, _.ary(select.items.push.bind(select.items), 1));
    }

    function notSelected(item) {
      return select.isMulti ?
        !_.some(select.selected, {id: item.id}) :
        select.selected != item
        ;
    }
  }
})();
