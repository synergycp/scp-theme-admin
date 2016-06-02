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
  function ListFactory(Api, Pages, WithSelected, EventEmitter, _) {
    return function (path) {
      return new List(Api.all(path), Pages(), WithSelected(), EventEmitter(), _);
    };
  }

  function List(api, pages, bulk, event, _) {
    var list = this;
    var $api = api;

    list.loading = false;
    list.items = [];
    list.load = load;

    list.pages = pages;
    list.bulk = bulk;
    list.delete = deleteItems;

    event.bindTo(list);

    activate();

    ///////////

    function activate() {
      list.pages.on('change', load);

      setBulkEvents();
    }

    function setBulkEvents() {
      list.bulk.selectedResolver(getSelectedItems);
      list.bulk.on('apply', resetSelectedItems);
    }

    function getSelectedItems() {
      return _.filter(list.items, {
        checked: true,
      });
    }

    function resetSelectedItems() {
      return _.each(list.items, function (item) {
        item.checked = false;
      });
    }

    function load() {
      loading();

      return getItems()
        .then(storeItems)
        .then(loaded, loaded);
    }

    function loaded() {
      list.loading = false;
      list.fire('change', list.items);
    }

    function loading() {
      list.loading = true;
    }

    function getItems() {
      var query = {
        page: list.pages.current,
      };

      return $api.getList(query);
    }

    function deleteItems(items) {
      var ids = _.map(items, 'id').join(',');

      loading();

      var promise = $api.all(ids).remove();

      promise.then(load, load);

      return promise;
    }

    function storeItems(response) {
      var meta = response.meta;

      list.items.length = 0;
      _(response).forEach(function (item) {
        item.checked = false;
      }).forEach(function (item) {
        list.items.push(item);
      });
      list.pages.setMax(meta.last_page);
      list.pages.current = meta.current_page;
      list.pages.per_page = meta.per_page;
      list.pages.total = parseInt(meta.total);
    }
  }
})();
