(function () {
  'use strict';

  angular
    .module("app.system.permission-groups.list.filters")
    .controller("PermissionGroupsFiltersCtrl", PermissionGroupsFiltersCtrl);

  /**
   * @ngInject
   */
  function PermissionGroupsFiltersCtrl(
    Select,
    Observable,
    $state,
    $q,
    $timeout
  ) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {};
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      _.assign(filters.current, {
        q: $state.params.q,
      });
      var promises = [
        $timeout(),
      ];

      $q.all(promises).then(listenForChanges).then(fireChangeEvent);
    }

    function listenForChanges() {
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
      });

      $state.go(
        $state.current.name,
        {
          q: filters.current.q,
        },
        { location: "replace" }
      );

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
