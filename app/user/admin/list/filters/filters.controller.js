(function () {
  'use strict';

  angular
    .module('app.user.admin.list.filters')
    .controller('AdminFiltersCtrl', AdminFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function AdminFiltersCtrl(Select, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {
      q: $state.params.q,
    };
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      var promises = [
        $timeout(),
        // filters.admin.setSelectedId($state.params['admin']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.admin.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // admin: filters.admin.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'admin': filters.current.admin,
        'q': filters.current.q,
      });

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
