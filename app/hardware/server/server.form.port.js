(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .factory('ServerFormPort', PortFactory)
  ;

  var OS_RELOAD_STATUS = {
    SUPPORTED: "server.form.os-reloads.SUPPORTED",
    NOT_PRIMARY: "server.form.os-reloads.NOT-PRIMARY",
    NEEDS_ENTITY: "server.form.os-reloads.NEEDS-ENTITY",
    NEEDS_MAC: "server.form.os-reloads.NEEDS-MAC",
  };

  /**
   * @ngInject
   * @constructor
   */
  function PortFactory(Select, date, moment, Api) {
    return function (index) {
      return new Port(index, Select, date, moment, Api);
    };
  }

  /**
   * @constructor
   */
  function Port(index, Select, date, moment, Api) {
    var port = this;

    port.allowMultipleVLANs = false;
    port.input = {
      mac: '',
      max_bandwidth: ''
    };
    port.switch = Select('switch').on('change', syncSwitchFilter);
    port.group = Select('group').on('change', syncGroupFilter);
    port.switch.port = null;
    port.switch.speed = Select('port-speed').on('change', setDirty);
    port.entities = Select('entity')
      .multi()
      .filter({
        available: true,
      })
      .on('change', syncEntityFilter)
    ;
    port.entitiesOriginal = [];
    port.billing = {
      start: {
        value: null,
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
              port.billing.start.value = '';
            },
          }
        },
      },
    };

    port.getOSReloadStatusLang = getOSReloadStatusLang;

    port.loadEntities = loadEntities;
    port.$dirty = false;
    port.setDirty = setDirty;
    port.$setPristine = $setPristine;
    port.data = data;
    port.fromExisting = fromExisting;

    function syncGroupFilter() {
      setDirty();
      _.setContents(port.entities.selected, []);
      port.switch
        .filter({
          group: port.group.getSelected('id'),
        })
        .load()
      ;
      syncEntityFilter();
    }

    function fromExisting(response) {
      port.id = response.id;
      port.original = response;
      port.input.mac = response.mac;

      if (port.group.getSelected('id') != response.group.id) {
        port.group.selected = response.group;
        syncGroupFilter();
      }

      if (response.switch) {
        port.switch.selected = response.switch;
        syncSwitchFilter();

        port.switch.port.selected = response.switch.port;
        port.switch.speed.selected = response.switch.port.speed;

        port.allowMultipleVLANs = response.switch.allow_multiple_vlans;
        syncEntityFilter();
      }

      port.billing.start.value = response.billing.start ?
        date.parse(response.billing.start) : '';
    }

    function getOSReloadStatusLang() {
      if (index > 0) {
        return OS_RELOAD_STATUS.NOT_PRIMARY;
      }

      if (!port.input.mac) {
        return OS_RELOAD_STATUS.NEEDS_MAC;
      }

      if (!port.entities.selected.length) {
        return OS_RELOAD_STATUS.NEEDS_ENTITY;
      }

      return OS_RELOAD_STATUS.SUPPORTED;
    }

    function loadEntities() {
      return Api
        .all('entity')
        .getList({'server_port_id': port.id})
        .then(storeEntities)
        ;
    }

    function storeEntities(response) {
      _.setContents(port.entities.selected, response);
      _.setContents(port.entitiesOriginal, response);

      syncEntityFilter();
    }

    function syncEntityFilter() {
      setDirty();
      port.entities
        .clearFilter('extra_for_id')
        .clearFilter('ip_group')
        .filter({
          extra_for_id: _.get(port, 'entities.selected[0].id'),
          allow_multiple_vlans: port.allowMultipleVLANs,
          ip_group: _.get(port, 'group.selected.id'),
          allow_server_port_id: port.id,
        })
        .load()
      ;
    }

    function syncSwitchFilter() {
      setDirty();
      if (!port.switch.selected) {
        port.switch.port = null;

        return;
      }

      if (port.switch.port && port.switch.port.switchId == port.switch.selected.id) {
        return;
      }
      port.switch.port = Select('switch/'+port.switch.selected.id+'/port')
        .on('change', switchPortChanged)
        .filter({
          available: true,
          allowed_id: port.original && port.original.switch ?
            port.original.switch.port.id :
            undefined,
        })
      ;
      port.switch.port.switchId = port.switch.selected.id;
      port.switch.port.load();
    }

    function data() {
      var currentEntityIds = _.map(port.entities.selected, 'id');
      var originalEntityIds = _.map(port.entitiesOriginal, 'id');

      return {
        id: port.id,
        mac: port.input.mac,
        switch: {
          id: port.switch.getSelected('id'),
          port: {
            id: port.switch.port ? port.switch.port.getSelected('id') || null : null,
          },
          speed: {
            id: port.switch.speed.getSelected('id') || null,
          },
        },
        billing: {
          start: port.billing.start.value ?
            moment(port.billing.start.value)
              .toISOString() :
            null,
        },
        group: {
          id: port.group.getSelected('id') || null,
        },
        entities: {
          add: _.difference(
            currentEntityIds,
            originalEntityIds
          ),
          remove: _.difference(
            originalEntityIds,
            currentEntityIds
          ),
        },
      };
    }

    function switchPortChanged() {
      port.max_bandwidth = '';
      setDirty();
    }

    function $setPristine() {
      _.setContents(
        port.entitiesOriginal,
        port.entities.selected
      );
      port.$dirty = 
        port.switch.port.$dirty =
        port.switch.speed.$dirty =
        port.entities.$dirty =
        port.group.$dirty =
        port.switch.$dirty =
        false;
    }

    function setDirty() {
      port.$dirty = true;
    }
  }
})();

