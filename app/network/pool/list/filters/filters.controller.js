(function () {
  "use strict";

  angular
    .module("app.network.pool.list.filters")
    .controller("PoolFiltersCtrl", PoolFiltersCtrl);

  /**
   * @ngInject
   */
  function PoolFiltersCtrl(Select, Search, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {};
    filters.group = Select("group");
    filters.owner = Select("client").addItem({
      id: "none",
      name: "Unassigned",
    });
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      _.assign(filters.current, {
        q: $state.params.q,
      });
      $q.all([
        filters.group.setSelectedId($state.params["group.id"]),
        filters.owner.setSelectedId(
          $state.params["owner.id"] || $state.params["owner"]
        ),
      ])
        .then(listenForChanges)
        .then(fireChangeEvent);
    }

    function listenForChanges() {
      filters.group.on("change", fireChangeEvent);
      filters.owner.on("change", fireChangeEvent);

      filters.shouldWatchMainSearch &&
        Search.on("change", function (searchStr) {
          _.assign(filters.current, {
            q: searchStr,
          });
        });
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        group: filters.group.getSelected("id"),
      });
      var ownerID = filters.owner.getSelected("id");

      switch (ownerID) {
        case null:
        case undefined:
          break;
        default:
          _.assign(filters.current, {
            owner: undefined,
            "owner[type]": "client",
            "owner[id]": filters.owner.getSelected("id"),
          });
          break;
        case "none":
          _.assign(filters.current, {
            owner: "none",
            "owner[type]": undefined,
            "owner[id]": undefined,
          });
          break;
      }

      $state.go(
        $state.current.name,
        {
          "group.id": filters.current.group,
          "owner.id": filters.current["owner[id]"],
          owner: filters.current.owner,
          q: filters.current.q,
        },
        { location: "replace" }
      );
      filters.shouldWatchMainSearch && Search.go(filters.current.q);

      if (filters.change) {
        filters.change();
      }
    }

    function $onChanges(changes) {
      if (changes.show) {
        var onShow = filters.searchFocus.set.bind(null, true);
        (changes.show.currentValue ? onShow : angular.noop)();
      }
    }
  }
})();
