(function () {
  'use strict';

  angular
    .module('app.system.notification.list.filters')
    .controller('NotificationFiltersCtrl', NotificationFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function NotificationFiltersCtrl(Select, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {
    };
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      _.assign(filters.current, {
        q: $state.params.q,
      });
      var promises = [
        $timeout(),
        // filters.email.setSelectedId($state.params['email']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      // filters.email.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // email: filters.email.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'email': filters.current.email,
        'q': filters.current.q,
      }, {location: 'replace'});

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
