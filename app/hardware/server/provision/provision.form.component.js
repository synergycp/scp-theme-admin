(function () {
  'use strict';

  var FILTER = {
    GROUP: {
      inventory: true,
    },
    CPU: {
      part_type: 'cpu',
    },
    MEM: {
      part_type: 'mem',
    },
    DISK: {
      part_type: 'disk',
    },
    ADDON: {
      part_type: 'add-on',
    },
  };

  var INPUT = {
    billing: {
      max_bandwidth: '',
      id: '',
    },
    password: '',
    nickname: '',
    access: {
      ipmi: true,
      'switch': true,
      pxe: true,
    }
  };

  angular
    .module('app.hardware.server')
    .component('provisionForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'ProvisionFormCtrl as provisionForm',
      transclude: true,
      templateUrl: 'app/hardware/server/provision/provision.form.html',
    })
    .controller('ProvisionFormCtrl', ProvisionFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ProvisionFormCtrl(Select, MultiInput, _, $stateParams, ServerConfig) {
    var provisionForm = this;

    provisionForm.$onInit = init;
    provisionForm.client = Select('client');
    provisionForm.group = Select('group')
      .filter(FILTER.GROUP)
      .on('change', syncGroupToEntities)
      .on('change', syncHardwareFilters)
      ;
    provisionForm.cpu = Select('part')
      .filter(FILTER.CPU)
      .on('change', syncHardwareFilters);
    provisionForm.group.on('change', clear.bind(null, provisionForm.cpu));
    provisionForm.mem = Select('part')
      .filter(FILTER.MEM)
      .on('change', syncHardwareFilters);
    provisionForm.cpu.on('change', clear.bind(null, provisionForm.mem));
    provisionForm.disks = MultiInput(DiskSelector)
      .setMax(ServerConfig.MAX_DISKS)
      .add()
      .on('change', syncHardwareFilters)
      ;
    provisionForm.mem.on('change', clearMulti.bind(null, provisionForm.disks));
    provisionForm.addOns = MultiInput(AddOnSelector)
      .add()
      .on('add', syncHardwareFilters)
      ;
    provisionForm.mem.on('change', clearMulti.bind(null, provisionForm.addOns));
    provisionForm.server = Select('server').filter({
      available: true,
    });
    provisionForm.mem.on('change', clear.bind(null, provisionForm.server));
    provisionForm.profile = Select('pxe/profile')
      .on('change', checkPxeProfileForIso);
    provisionForm.profile.hasIso = false;
    provisionForm.billing = {
      date: {
        value: new Date(),
        isOpen: false,
      },
    };
    provisionForm.edition = null;
    provisionForm.switchSpeed = Select('port-speed');
    provisionForm.entities = Select('entity').multi().filter({
      available: true,
    }).on('change', syncEntityToGroup);

    //////////

    function init() {
      provisionForm.input = provisionForm.form.input || {};
      _.assign(provisionForm.input, INPUT);

      provisionForm.form.getData = getData;
    }

    function syncGroupToEntities() {
      _.setContents(provisionForm.entities.selected, []);
      syncEntityFilter();
    }

    function checkPxeProfileForIso() {
      var iso = (provisionForm.profile.selected || {}).iso;
      provisionForm.profile.hasIso = !!iso;

      if (!provisionForm.profile.hasIso) {
        provisionForm.edition = null;
        return;
      }

      provisionForm.edition = Select('pxe/iso/'+iso.id+'/edition');
    }

    function syncHardwareFilters() {
      var invFilter = {
        cpu: provisionForm.cpu.getSelected('id') || undefined,
        mem: provisionForm.mem.getSelected('id') || undefined,
        ip_group: provisionForm.group.getSelected('id') || undefined,
      };
      var diskIds = _(provisionForm.disks.items).map(function(disk) {
        return disk.getSelected('id');
      }).filter().value();
      provisionForm.server.filter(invFilter).filter({
        'disks[]': diskIds,
      }).load();
      _.each([
        provisionForm.cpu,
        provisionForm.mem,
      ], function (select) {
        select.filter({
          inventory: _.assign({}, invFilter, { disks: diskIds }),
        }).load();
      });

      _.each({
        disks: provisionForm.disks.items,
        addOns: provisionForm.addOns.items,
      }, function (selectItems, filterKey) {
        _.reduce(selectItems, function (carry, select, key) {
          var filter = {};
          filter[filterKey] = _.clone(carry);
          select.filter({
            inventory: _.assign({}, invFilter, filter),
          }).load();
          var val = select.getSelected('id');
          if (val) {
            carry.push(val);
          }
          return carry;
        }, []);
      });
    }

    function syncEntityToGroup() {
      var entityGroup = (provisionForm.entities.selected[0] || {}).group || null;
      var entityGroupId = (entityGroup || {}).id || null;
      if (!entityGroup || provisionForm.group.getSelected('id') == entityGroupId) {
        syncEntityFilter();
        return;
      }

      var selectedEntities = _.clone(provisionForm.entities.selected);

      provisionForm.group.selected = entityGroup;
      provisionForm.group.fireChangeEvent();

      _.setContents(provisionForm.entities.selected, selectedEntities);
      syncEntityFilter();
    }

    function syncEntityFilter() {
      provisionForm.entities
        .clearFilter('extra_for_id')
        .clearFilter('ip_group')
        .filter({
          extra_for_id: (provisionForm.entities.selected[0] || {}).id,
          ip_group: (provisionForm.group.selected || {}).id,
        })
        .load();
    }

    function getData() {
      var data = _.clone(provisionForm.input);

      data.entities = _.map(provisionForm.entities.selected, 'id');
      data.switch = {
        speed: {
          id: provisionForm.switchSpeed.getSelected('id'),
        },
      };
      data.group = {
        id: provisionForm.group.getSelected('id'),
      };
      data.client = {
        id: provisionForm.client.getSelected('id'),
      };
      data.billing.date = provisionForm.billing.date.value ? provisionForm.billing.date.value.toUTCString() : null;
      data.server = {
        id: provisionForm.server.getSelected('id'),
      };
      data.profile = {
        id: provisionForm.profile.getSelected('id'),
      };
      data.edition = provisionForm.profile.hasIso ? {
        id: provisionForm.edition.getSelected('id'),
      } : null;

      return data;
    }

    function ids(multi) {
      return _(multi.items)
        .map('selected.id')
        .filter()
        .value()
        ;
    }

    function DiskSelector(selected) {
      var select = Select('part')
        .filter(FILTER.DISK)
        .on('change', syncHardwareFilters)
        ;

      select.selected = selected || null;
      select.load();

      return select;
    }

    function AddOnSelector(selected) {
      var select = Select('part')
        .filter(FILTER.ADDON)
        .on('change', syncHardwareFilters)
        ;
      select.selected = selected || null;
      select.load();

      return select;
    }

    function clear(select) {
      var prev = select.selected;
      select.selected = null;

      if (select.selected != prev) {
        select.fireChangeEvent();
      }
    }
    function clearMulti(multi) {
      _.each(multi.items, function (select) {
        clear(select);
      });
    }
  }
})();
