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
    .module('app.hardware.server.provision')
    .component('provisionForm', {
      require: {},
      bindings: {
        form: '=',
        serverId: '=',
        clientId: '=',
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
  function ProvisionFormCtrl(ClientUsersModals, Select, MultiInput, _, $stateParams, ServerConfig, moment) {
    var provisionForm = this;

    provisionForm.$onInit = init;
    provisionForm.input = _.clone(INPUT);
    provisionForm.client = Select('client');
    provisionForm.createClient = openCreateClientModal;
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
      .on(['set', 'add', 'rem', 'change'], syncHardwareFilters)
    ;
    provisionForm.mem.on('change', clearMulti.bind(null, provisionForm.disks));
    provisionForm.addOns = MultiInput(AddOnSelector)
      .add()
      .on('add', syncHardwareFilters)
    ;
    provisionForm.mem.on('change', clearMulti.bind(null, provisionForm.addOns));
    provisionForm.disks.on(['set', 'add', 'rem', 'change'], clearMulti.bind(null, provisionForm.addOns));
    provisionForm.server = Select('server')
      .filter({
        available: true,
        'parts[exact]': true,
      })
      .on('change', syncServer);
    provisionForm.cpu.on('change', clear.bind(null, provisionForm.server));
    provisionForm.mem.on('change', clear.bind(null, provisionForm.server));
    provisionForm.disks.on(['set', 'add', 'rem', 'change'], clear.bind(null, provisionForm.server));
    provisionForm.addOns.on(['set', 'add', 'rem', 'change'], clear.bind(null, provisionForm.server));
    provisionForm.osReloads = Profiles().add();
    provisionForm.billing = {
      integration: Select('integration'),
      date: {
        value: new Date(),
        options: {
          locale: {
            format: 'MM/DD/YYYY h:mm A',
            cancelLabel: 'Clear',
          },
          autoUpdateInput: false,
          singleDatePicker: true,
          timePicker: true,
          timePickerIncrement: 30,
          eventHandlers: {
            'cancel.daterangepicker': function (ev, picker) {
              provisionForm.billing.date.value = '';
            },
          }
        },
      },
    };
    provisionForm.edition = null;
    provisionForm.switchSpeed = Select('port-speed');
    provisionForm.entities = Select('entity')
      .multi()
      .filter({
        available: true,
      })
      .on('change', syncEntityToGroup);

    //////////

    function init() {
      provisionForm.client.setSelectedId($stateParams['client.id']);
      provisionForm.server.setSelectedId($stateParams['server.id']);

      fillFormInputs();

      provisionForm.form.getData = getData;
    }

    function syncServer(server) {
      if (!server) {
        return;
      }

      if (!provisionForm.group.getSelected('id')) {
        provisionForm.group.setSelectedId(server.group.id);
      }

      // Primary group can be different from the IP group.
      provisionForm.entities
        .filter({
          ip_group: server.group.id,
        })
        .load()
      ;
    }

    function fillFormInputs() {
      _.overwrite(provisionForm.input, provisionForm.form.input);
    }

    function syncGroupToEntities() {
      _.setContents(provisionForm.entities.selected, []);
      syncEntityFilter();
    }

    // function checkPxeProfileForIso() {
    //   console.log('checkPxeProfileForIso: ', provisionForm.osReloads);
    //   _.each(provisionForm.osReloads.items, function(profile) {
    //     var iso = (profile.selected || {}).iso;
    //     profile.hasIso = !!iso;

    //     if (!profile.hasIso) {
    //       profile.edition = null;
    //       return;
    //     }

    //     profile.edition = Select('pxe/iso/' + iso.id + '/edition');
    //   })
    // }

    function multiIds(multi) {
      return _(multi.items)
        .map(function (disk) {
          return disk.getSelected('id');
        })
        .filter()
        .value()
    }

    function syncHardwareFilters() {
      var invFilter = {
        cpu: provisionForm.cpu.getSelected('id') || undefined,
        mem: provisionForm.mem.getSelected('id') || undefined,
        ip_group: provisionForm.group.getSelected('id') || undefined,
      };
      var diskIds = multiIds(provisionForm.disks);
      var addOnIds = multiIds(provisionForm.addOns);
      provisionForm.server
        .filter(invFilter)
        .filter({
          'disks[]': diskIds,
          'addons[]': addOnIds,
        })
        .load();
      provisionForm.cpu
        .filter({
          inventory: _.pick(invFilter, ['ip_group']),
        })
        .load();
      provisionForm.mem
        .filter({
          inventory: _.pick(invFilter, ['ip_group', 'cpu']),
        })
        .load();

      var selectedCollection = {};
      _.each({
        addOns: provisionForm.addOns.items,
        disks: provisionForm.disks.items
      }, function(itemSelects, itemKey) {
        var ids = _.reduce(itemSelects, function(carry, select) {
          var selected = select.getSelected('id');
          if(selected) {
            carry.push(selected);
          }
          return carry;         
        }, [])
        if(ids.length) {
          selectedCollection[itemKey] = ids;
        }
      })
      _.each(provisionForm.addOns.items, function(addOnSelect) {
        addOnSelect.filter({
          inventory: _.assign({}, invFilter, _.pick(selectedCollection, ['disks'])),
        }).load();
      })
      _.each(provisionForm.disks.items, function(addOnSelect) {
        addOnSelect.filter({
          inventory: _.assign({}, invFilter, _.pick(selectedCollection, ['addOns'])),
        }).load();
      })
    }

    function syncEntityToGroup() {
      var entityGroup = (provisionForm.entities.selected[0] || {}).group || null;
      if (!entityGroup || provisionForm.group.getSelected('id')) {
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
      data.billing.integration = {
        id: provisionForm.billing.integration.getSelected('id') || null,
      };
      data.billing.date = provisionForm.billing.date.value ? moment(provisionForm.billing.date.value)
        .toISOString() : null;
      data.billing.max_bandwidth = provisionForm.billing.max_bandwidth;
      data.server = {
        id: provisionForm.server.getSelected('id'),
      };
      var osReloadsData = provisionForm.osReloads.getProfilesData();
      console.log('osReloadsData', osReloadsData);
      data.profile = {
        id: osReloadsData[0].profile.id,
      };
      data.edition = !!osReloadsData[0].profile.iso ? {
        id: osReloadsData[0].edition.id,
      } : null;
      data.osReloads = osReloadsData; // for `/server/{id}/install` requests, should be deleted before POST `/server/provision` request

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

    // function ProfileSelector(selected) {
    //   var select = Select('pxe/profile')
    //     .on('change', checkPxeProfileForIso);
    //   ;
    //   select.hasIso = false;

    //   select.selected = selected || null;
    //   select.load();

    //   return select;
    // }

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

    function openCreateClientModal() {
      ClientUsersModals.openCreate()
        .result
        .then(function (user) {
          provisionForm.client.selected = user;
        })
        .catch(function () {
        });
    }

    function Profiles() {
      var profiles = [];

      profiles.add = function() {
        profiles.push({});
        return profiles;
      }

      profiles.rem = function(index) {
        profiles.splice(index, 1);
        return profiles;
      }

      profiles.getProfilesData = function() {
        return _.map(profiles, function(profile) {
          return profile.getData();
        })
      }
      return profiles;
    }
  }
})();
