(function () {
  'use strict';

  angular
    .module('app.network.forward.gateway.list.filters')
    .controller('ForwardGatewayFiltersCtrl', ForwardGatewayFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function ForwardGatewayFiltersCtrl(Select, Search, Observable, $state, $q, $timeout) {
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
        // filters.gateway.setSelectedId($state.params['gateway']),
      ];

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      filters.shouldWatchMainSearch && Search.on('change', function(searchStr) {
        _.assign(filters.current, {
          q: searchStr
        });
      })
      // filters.gateway.on('change', fireChangeEvent);
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        // gateway: filters.gateway.getSelected('id'),
      });

      $state.go($state.current.name, {
        // 'gateway': filters.current.gateway,
        'q': filters.current.q,
      }, {location: 'replace'});
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
