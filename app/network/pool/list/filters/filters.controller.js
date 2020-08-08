(function () {
  'use strict';

  angular
    .module('app.network.pool.list.filters')
    .controller('PoolFiltersCtrl', PoolFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function PoolFiltersCtrl(Select, Search, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    filters.current = {};
    filters.group = Select('group');
    filters.client = Select('client')
      .addItem({
        id: 'none',
        text: 'Unassigned'
      });
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;

    //////////

    function init() {
      _.assign(filters.current, {
        q: $state.params.q,
      });
      $q.all([
        filters.group.setSelectedId($state.params['group.id']),
        filters.client.setSelectedId($state.params['client.id']),
      ]).then(listenForChanges).then(fireChangeEvent);
    }

    function listenForChanges() {
      filters.group.on('change', fireChangeEvent);
      filters.client.on('change', fireChangeEvent);

      filters.shouldWatchMainSearch && Search.on('change', function(searchStr) {
        _.assign(filters.current, {
          q: searchStr
        });
      })
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        group: filters.group.getSelected('id'),
        client: filters.client.getSelected('id'),
      });

      filters.client
        .filter({
          ip_group: (filters.group.selected || {}).id,
        })
        .load();

      $state.go($state.current.name, {
        'group.id': filters.current.group,
        'client.id': filters.current.client,
        q: filters.current.q,
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
