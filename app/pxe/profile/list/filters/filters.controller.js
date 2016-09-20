(function () {
  'use strict';

  angular
    .module('app.pxe.profile.list.filters')
    .controller('ProfileFiltersCtrl', ProfileFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function ProfileFiltersCtrl(Select, Observable, $state, $q, $timeout) {
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
        // filters.profile.setSelectedId($state.params['profile']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.profile.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // profile: filters.profile.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'profile': filters.current.profile,
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
