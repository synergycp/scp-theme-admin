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
  function ListFactory(Api, Pages, WithSelected, EventEmitter, Loader, _) {
    return function (path) {
      return new List(Api.all(path), Pages(), WithSelected(), EventEmitter(), Loader(), _);
    };
  }

  function List(api, pages, bulk, event, loader, _) {
    var list = this;
    var $api = api;
    var filter = {};
    var refreshInterval;

    list.items = [];
    list.sortQuery = {};
    list.load = _.debounce(forceLoad, 5);
    list.loader = loader;

    list.pages = pages;
    list.bulk = bulk;
    list.delete = deleteItems;
    list.create = create;
    list.sort = sort;
    list.clearSort = clearSort;
    list.filter = setFilter;
    list.refreshEvery = refreshEvery;

    event.bindTo(list);

    activate();

    ///////////

    function activate() {
      list.pages.on('change', list.load);

      setBulkEvents();
    }

    function refreshEvery(interval) {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }

      if (interval) {
        refreshInterval = setInterval(list.load, interval);
      }

      return list;
    }

    function setBulkEvents() {
      list.bulk.selectedResolver(getSelectedItems);
      list.bulk.on('apply', resetSelectedItems);
    }

    function sort(key, val) {
      if (_.isObject(key)) {
        _.assign(list.sortQuery, key);
      } else {
        list.sortQuery[key] = val;
      }

      list.load();

      return list;
    }

    function clearSort() {
      _.each(list.sortQuery, function (value, key) {
        delete list.sortQuery[key];
      });

      list.load();

      return list;
    }

    function getSelectedItems() {
      return _.filter(list.items, {
        checked: true,
      });
    }

    function resetSelectedItems() {
      return _.each(list.items, {
        checked: false,
      });
    }

    function forceLoad() {
      return list.loader.during(
        getItems()
          .then(storeItems)
          .then(fireChangeEvent)
      );
    }

    function getItems() {
      var query = buildQuery();

      return $api.getList(query);
    }

    function deleteItems(items, data) {
      var ids = _.map(items, 'id').join(',');

      return $api.all(ids)
        .remove(data || {})
        .then(list.load)
        ;
    }

    function buildQuery() {
      return _.assign({}, buildFilterQuery(), buildSortQuery());
    }

    function setFilter(filters) {
      _.assign(filter, filters);

      return list;
    }

    function buildFilterQuery() {
      return _.assign({}, filter, {
        page: list.pages.current,
      });
    }

    function buildSortQuery() {
      var sortQuery = {};

      _.each(list.sortQuery, function (direction, col) {
        sortQuery['sort['+col+']'] = direction;
      });

      return sortQuery;
    }

    function create(item) {
      return $api.post(item)
        .then(list.load)
        ;
    }

    function storeItems(response) {
      list.items.length = 0;
      _(response).forEach(function(item) {
        item.checked = false;
        list.items.push(item);
      });

      list.pages.fromMeta(response.meta);
    }

    function fireChangeEvent() {
      event.fire('change', list.items);
    }
  }
})();
