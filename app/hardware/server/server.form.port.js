(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .factory('ServerFormPort', PortFactory)
  ;

  /**
   * @ngInject
   * @constructor
   */
  function PortFactory(Select, $stateParams, $q, date, moment, Api) {
    return function () {
      return new Port(Select, $stateParams, $q, date, moment, Api);
    };
  }

  /**
   * @constructor
   */
  function Port(Select, $stateParams, $q, date, moment, Api) {
    var port = this;

    port.input = {
      mac: '',
    };
    port.switch = Select('switch').on('change', syncSwitchFilter);
    port.group = Select('group').on('change', syncGroupFilter);
    port.switch.port = {};
    port.switch.speed = Select('port-speed');
    port.entities = Select('entity')
      .multi()
      .filter({
        available: true,
      })
      .on('change', syncEntityFilter)
    ;
    port.entities.original = [];
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

    port.loadEntities = loadEntities;
    port.$setPristine = $setPristine;
    port.data = data;
    port.fromExisting = fromExisting;

    function $setPristine() {
      port.switch.port.$dirty =
        port.switch.speed.$dirty =
        port.entities.$dirty =
        port.group.$dirty =
        port.switch.$dirty =
        false;
      _.setContents(
        port.entities.original,
        port.entities.selected
      );
    }

    function syncGroupFilter() {
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
      }

      port.billing.start.value = response.billing.start ?
        date.parse(response.billing.start) : '';
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
      _.setContents(port.entities.original, response);

      syncEntityFilter();
    }

    function syncEntityFilter() {
      port.entities
        .clearFilter('extra_for_id')
        .clearFilter('ip_group')
        .filter({
          extra_for_id: (port.entities.selected[0] || {}).id,
          ip_group: (port.group.selected || {}).id,
          allow_server_port_id: port.id,
        })
        .load()
      ;
    }

    function syncSwitchFilter() {
      if (!port.switch.selected) {
        port.switch.port = null;

        return;
      }

      if (port.switch.port && port.switch.port.switchId == port.switch.selected.id) {
        return;
      }

      port.switch.port = Select('switch/'+port.switch.selected.id+'/port')
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
      var originalEntityIds = _.map(port.entities.original, 'id');

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
  }
})();

