(function () {
  'use strict';

  angular
    .module('app.hardware.server.list.filters')
    .controller('ServerFiltersCtrl', ServerFiltersCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerFiltersCtrl(Select, Search, MultiInput, Observable, $state, $q, $timeout) {
    var filters = this;

    filters.$onInit = init;
    filters.$onChanges = $onChanges;

    _.assign(filters.current, {
      q: $state.params.q
    });
    filters.group = Select('group').multi();
    filters.client = Select('client').multi();
    filters.switch = Select('switch').multi();
    filters.cpu = Select('part').filter({'part_type':'cpu'}).multi();
    filters.mem = Select('part').filter({'part_type':'mem'}).multi();
    filters.disks = MultiInput(DiskSelector)
      .add().setMax(50);
    filters.addons = MultiInput(AddonSelector)
      .add().setMax(8);
    filters.bw = {
      min: null,
      max: null
    };
    filters.billing = {
      id: null,
      integration: Select('integration')
    };
    filters.searchFocus = Observable(false);

    filters.fireChangeEvent = fireChangeEvent;
    filters.clearBilling = clearBilling;

    //////////

    function init() {
      _.defaults(filters, {
        showClient: true
      });
    
      var promises = [
        $timeout(),
        filters.group.setSelectedId($state.params['group']),
        filters.client.setSelectedId($state.params['client'] || filters.current.client),
        filters.switch.setSelectedId($state.params['switch']),
        filters.cpu.setSelectedId($state.params['cpu']),
        filters.mem.setSelectedId($state.params['mem']),
        filters.disks.setSelectedId(($state.params['disks[]'] || []).join(',')),
        filters.addons.setSelectedId(($state.params['addons[]'] || []).join(',')),
        filters.billing.integration.setSelectedId($state.params['billing.integration']),
      ];
      filters.bw.min = $state.params['bw.min'] || null;
      filters.bw.max = $state.params['bw.max'] || null;
      filters.billing.id = $state.params['billing.id'] || null;

      $q.all(promises)
        .then(listenForChanges)
        .then(fireChangeEvent)
        ;
    }

    function listenForChanges() {
      filters.group.on('change', fireChangeEvent);
      filters.client.on('change', fireChangeEvent);
      filters.switch.on('change', fireChangeEvent);
      filters.cpu.on('change', fireChangeEvent);
      filters.mem.on('change', fireChangeEvent);
      filters.disks.on('rem', fireChangeEvent); // on 'add' event will be fired by Select
      filters.addons.on('rem', fireChangeEvent); // on 'add' event will be fired by Select
      filters.billing.integration.on('change', fireChangeEvent);
      
      filters.shouldWatchMainSearch && Search.on('change', function(searchStr) {
        _.assign(filters.current, {
          q: searchStr
        });
      })
    }

    function fireChangeEvent() {
      _.assign(filters.current, {
        group: _.map((filters.group.selected || []), getObjId).join(','),
        client: _.map((filters.client.selected || []), getObjId).join(','),
        switch: _.map((filters.switch.selected || []), getObjId).join(','),
        cpu: _.map((filters.cpu.selected || []), getObjId).join(','),
        mem: _.map((filters.mem.selected || []), getObjId).join(','),
        'billing.id': filters.billing.integration.selected && filters.billing.id || undefined,
        'billing.integration': filters.billing.integration.selected && filters.billing.integration.selected.id,
        'disks[]': multiIds(filters.disks),
        'addons[]': multiIds(filters.addons),
        'bw.min': filters.bw.min, 
        'bw.max': filters.bw.max, 
      });

      $state.go($state.current.name, _.assign({}, filters.current));
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

    function multiIds(multi) {
      return _(multi.items || []).map(function(select){
          return select.selected && select.selected.id;
        }).filter().value() || '';
    }

    function DiskSelector(selected) {
      var select = Select('part').filter({'part_type':'disk'});
      select.setSelectedId( selected && (_.isString(selected) ? selected : selected.id) || null);
      select.on('change', fireChangeEvent);

      return select;
    }

    function AddonSelector(selected) {
      var select = Select('part').filter({'part_type':'add-on'});
      select.setSelectedId( selected && (_.isString(selected) ? selected : selected.id) || null);
      select.on('change', fireChangeEvent);

      return select;
    }

    function clearBilling() {
      filters.billing.id = null;
      filters.billing.integration.clear();
    }

    function getObjId(obj) {
      return obj.id;
    }
  }
})();
