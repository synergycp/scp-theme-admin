(function () {
  "use strict";

  angular
    .module("app.system.template.suggested-change.list.filters")
    .component("templateSuggestedChangeFilters", {
      require: {
        list: "^list",
      },
      bindings: {
        show: "<",
        current: "=",
        change: "&?",
      },
      controller: "TemplateSuggestedChangeFiltersCtrl as filters",
      transclude: true,
      templateUrl:
        "app/system/template/suggested-change/list/filters/filters.html",
    })
    .controller(
      "TemplateSuggestedChangeFiltersCtrl",
      TemplateSuggestedChangeFiltersCtrl
    );

  /**
   * @ngInject
   */
  function TemplateSuggestedChangeFiltersCtrl(Observable, $state, $timeout) {
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
        type: $state.params.type,
      });

      $timeout().then(fireChangeEvent);
    }

    function fireChangeEvent() {
      filters.current.type = filters.current.type || undefined;

      $state.go(
        $state.current.name,
        {
          q: filters.current.q,
          type: filters.current.type,
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
