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
  function ProvisionFormCtrl(ClientModal, Select, MultiInput, _, $stateParams, ServerConfig, moment, Modal) {
    var provisionForm = this;

    provisionForm.$onInit = init;
    provisionForm.input = _.clone(INPUT);
    provisionForm.client = Select('client');
    provisionForm.createClient = openCreateClientModal;
    provisionForm.bandwidthModal = openBandwidthHelpModal;
    provisionForm.group = Select('group')
      .filter(FILTER.GROUP)
      .on('change', syncGroupToEntities)
      .on('change', syncHardwareFilters)
    ;
    provisionForm.cpu = Select('part')
      .filter(FILTER.CPU)
      .on('change', syncHardwareFilters);
    provisionForm.group.on('change', clearCpuOnGroupChange);
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
    provisionForm.osReloads = (new Profiles()).add();
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
            'cancel.daterangepicker': function () {
              provisionForm.billing.date.value = '';
            },
          }
        },
      },
    };
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
      syncEntityFilter();
      if (!server) {
        return;
      }
      server.get()
        .then(function (res) {
          provisionForm.server.selected = res;
        });

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
      }, function (itemSelects, itemKey) {
        var ids = _.reduce(itemSelects, function (carry, select) {
          var selected = select.getSelected('id');
          if (selected) {
            carry.push(selected);
          }
          return carry;
        }, []);
        if (ids.length) {
          selectedCollection[itemKey] = ids;
        }
      });
      _.each(provisionForm.addOns.items, function (addOnSelect) {
        addOnSelect.filter({
            inventory: _.assign({}, invFilter, _.pick(selectedCollection, ['disks'])),
          })
          .load();
      });
      _.each(provisionForm.disks.items, function (addOnSelect) {
        addOnSelect.filter({
            inventory: _.assign({}, invFilter, _.pick(selectedCollection, ['addOns'])),
          })
          .load();
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
          extra_for_id: _.get(provisionForm, 'entities.selected[0].id'),
          allow_multiple_vlans: _.get(provisionForm, 'server.selected.switch.allow_vlan_tagging'),
          ip_group: _.get(provisionForm, 'group.selected.id'),
        })
        .load();
    }

    function clearCpuOnGroupChange() {
      if (provisionForm.group.getSelected('id') !== provisionForm.server.selected.group.id) {
        clear.bind(null, provisionForm.cpu);
      }
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
      provisionForm.osReloads.removeEmpty();
      var osReloadsData = provisionForm.osReloads.getProfilesData();
      if (!osReloadsData) {
        return false;
      }
      data.profile = {
        id: osReloadsData[0].profile.id,
      };
      data.edition = !!osReloadsData[0].profile.iso ? {
        id: osReloadsData[0].edition.id,
      } : null;
      data.license_key = osReloadsData[0].licenseKey;
      data.password = provisionForm.input.password;
      data.disk = {
        raid: osReloadsData[0].raid,
        index: osReloadsData[0].index,
      };
      data.osReloads = osReloadsData; // for `/server/{id}/install` requests, should be deleted before POST `/server/provision` request

      return data;
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

      if (select.selected !== prev) {
        select.fireChangeEvent();
      }
    }

    function clearMulti(multi) {
      _.each(multi.items, function (select) {
        clear(select);
      });
    }

    function openCreateClientModal() {
      ClientModal.create()
        .open()
        .result
        .then(function (user) {
          provisionForm.client.selected = user;
        })
        .catch(function () {
        });
    }

    function openBandwidthHelpModal() {
      var lang = "server.form.billing.max_bandwidth.modal";
      return Modal.information(lang)
        .open()
        .result
        .then(function () {
        }, function (res) {
        });
    }

    function Profiles() {
      var profiles = this;
      profiles.items = [];

      this.add = function () {
        profiles.items.push({
          id: Math.random() // to make ng-repeat work correctly
        });
        return profiles;
      };

      this.rem = function (index) {
        profiles.items.splice(index, 1);
        return profiles;
      };

      this.getProfilesData = function () {
        var isValid = true;
        var profilesData = _.map(profiles.items, function (profile) {
          var profileData = profile.getData();
          if (!profileData) {
            isValid = false;
          }
          return profileData;
        });
        return isValid && profilesData;
      };

      this.removeEmpty = function () {
        profiles.items = _.reduce(profiles.items, function (accum, profile, i) {
          if (profile.profileSelected) {
            accum.push(profile);
          } else {
            console.log('to remove i', i);
          }
          return accum;
        }, [])
      };

      return profiles;
    }
  }
})();
