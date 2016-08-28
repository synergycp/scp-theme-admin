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
  function ListFactory(Api, Pages, Refresh, WithSelected, EventEmitter, Loader, $debounce, _) {
    return function (path) {
      return new List(
        Api.all(path),
        Pages(),
        WithSelected(),
        EventEmitter(),
        Loader(),
        Refresh,
        $debounce,
        _
      );
    };
  }

  function List($api, pages, bulk, event, loader, Refresh, $debounce, _) {
    var list = this;
    var filter = {};

    list.items = [];
    list.sortQuery = {};
    list.load = $debounce(forceLoad, 5);
    list.loader = loader;

    list.pages = pages;
    list.bulk = bulk;
    list.delete = deleteItems;
    list.create = create;
    list.sort = sort;
    list.clearSort = clearSort;
    list.filter = setFilter;
    list.refresh = Refresh(list.load);
    list.patch = patch;

    event.bindTo(list);

    activate();

    ///////////

    function activate() {
      event.on('change', list.load);
      list.pages.on(['change', 'change:per'], list.load);

      setBulkEvents();
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
      );
    }

    function getItems() {
      var query = buildQuery();

      return $api.getList(query);
    }

    function deleteItems(data, items) {
      return withAll('remove', data, items);
    }

    function withAll(func, data, items) {
      if (!angular.isArray(items)) {
        var oldItems = items || null;
        items = data;
        data = oldItems;
      }

      if (!angular.isArray(items)) {
        throw new Error('Excepted array');
      }

      var ids = _.map(items, 'id').join(',');

      return $api.all(ids)
        [func](data || {})
        .branch()
          .then(fireChangeEvent)
        .unbranch()
        ;
    }

    function buildQuery() {
      return _.assign({
        per_page: list.pages.per,
      }, buildFilterQuery(), buildSortQuery());
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

    function create(item, opts) {
      var options = _.assign({
        reload: true,
      }, opts);
      var promise = $api.post(item);

      if (options.reload) {
        promise.then(list.load);
      }

      return promise;
    }

    function storeItems(response) {
      list.items.length = 0;
      _(response).forEach(function(item) {
        item.checked = false;
        list.items.push(item);
      });

      list.pages.fromMeta(response.meta);
    }

    function patch(data, items) {
      return withAll("patch", data, items);
    }

    function fireChangeEvent() {
      event.fire('change', list.items);
    }
  }
})();
