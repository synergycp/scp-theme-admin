(function () {
  'use strict';

  var INPUTS = {
    srv_id: '',
    nickname: '',
    ipmi: {
      ip: '',
      admin: {
        username: '',
        password: '',
      },
      client: {
        username: '',
        password: '',
      },
    },
    billing: {
      id: '',
      max_bandwidth: '',
      date: '',
    },
  };

  angular
    .module('app.hardware')
    .component('serverForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'ServerFormCtrl as serverForm',
      transclude: true,
      templateUrl: 'app/hardware/server/server.form.html'
    })
    .controller('ServerFormCtrl', ServerFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerFormCtrl(_, Api, Select, Modal, ServerFormPort, MultiInput, $rootScope, ServerConfig, $stateParams, $q) {
    var serverForm = this;
    var $ports;

    serverForm.$onInit = init;
    serverForm.input = _.clone(INPUTS);
    serverForm.cpu = Select('part?part_type=cpu');
    serverForm.mem = Select('part?part_type=mem');
    serverForm.disks = MultiInput(DiskSelector)
      .setMax(ServerConfig.MAX_DISKS)
      .add();
    serverForm.addOns = MultiInput(AddOnSelector).add();
    serverForm.ports = [];
    serverForm.ports.add = addPort;
    serverForm.ports.remove = removePort;
    serverForm.ports.removed = [];
    serverForm.billing = {
      date: {
        value: '',
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
            'apply.daterangepicker': function (ev, picker) {
              serverForm.form.form['billing.date'].$dirty = true;
            },
            'cancel.daterangepicker': function (ev, picker) {
              serverForm.billing.date.value = '';
            },
          },
        },
        empty: emptyBillingDate,
      },
    };

    //////////

    function emptyBillingDate() {
      serverForm.form.form['billing.date'].$dirty = serverForm.billing.date.value != '';
      serverForm.billing.date.value = '';
    }

    function addPort() {
      serverForm.ports.push(ServerFormPort());
    }

    function removePort(port) {
      if (port.id) {
        return confirmRemove(port)
          .then(removeFromList)
          .then(removeFromDatabase)
        ;
      }

      removeFromList();

      function removeFromDatabase() {
        return $ports.one(''+port.id).remove();
      }

      function removeFromList() {
        _.remove(serverForm.ports, port);
      }
    }

    function confirmRemove(port) {
      return Modal
        .confirm([port.original], 'server.form.port.remove')
        .open()
        .result
        ;
    }

    function init() {
      serverForm.form.getData = getData;
      fillFormInputs();

      if (!serverForm.form.on) {
        return;
      }

      serverForm.form
        .on(['load', 'change', 'created'], storeState)
        .on(['saving', 'created'], savePorts)
      ;

      if ($stateParams.id) {
        $ports = Api.all('server/'+$stateParams.id+'/port');
        $ports
          .getList()
          .then(storePorts)
        ;
      }
    }

    function storePorts(response) {
      _.each(response, function (portData) {
        var port = ServerFormPort();

        port.fromExisting(portData);
        port.loadEntities();
        serverForm.ports.push(port);
      });
    }

    function fillFormInputs() {
      _.overwrite(serverForm.input, serverForm.form.input);
    }

    function storeState(response) {
      $ports = Api.all('server/'+response.id+'/port');

      $rootScope.$evalAsync(function() {
        fillFormInputs();

        storeMulti(response.disks, serverForm.disks);
        storeMulti(response.addons, serverForm.addOns);

        serverForm.cpu.selected = response.cpu;
        serverForm.mem.selected = response.mem;

        serverForm.billing.date.value = response.billing.date ?
          Date.parse(response.billing.date) : '';
      });
    }

    function storeMulti(items, target) {
      target.items.splice(items.length);
      _.map(items, change);

      // Always guarantee at least one input.
      if (!items.length) {
        target.add();
      }
      target.$dirty = false;

      function change(item, key) {
        if (!hasChanged(item, key)) {
          return;
        }

        target.add(item, key);
      }

      function hasChanged (item, key) {
        var currentSelector = target.items[key];
        if (!currentSelector) {
          return true;
        }

        var selected = currentSelector.selected;
        return !selected || selected.id != item.id;
      }
    }

    function savePorts() {
      return $q.all(
        _.map(serverForm.ports, savePortChanges)
      ).then(function () {
        serverForm.form.form.$setPristine();
        serverForm.disks.$dirty = serverForm.addOns.$dirty = serverForm.cpu.$dirty = serverForm.mem.$dirty =
          false;
      });
    }

    function savePortChanges(port, portIndex) {
      var formData = port.data();
      var portPrefix = 'port-'+portIndex+'.';

      return $q.all([
        updateSwitchPort()
          .then(updateServerPort)
          .then(updateEntities),
      ]).then(port.$setPristine);

      function updateSwitchPort() {
        if (!port.switch.$dirty && !port.switch.port.$dirty && !port.switch.speed.$dirty) {
          return $q.when();
        }

        return Api
          .one(
            'switch/' + port.switch.getSelected('id') +
            '/port/' + port.switch.port.getSelected('id')
          )
          .patch({
            port_speed_id: port.switch.speed.getSelected('id'),
          })
          ;
      }

      function updateEntities() {
        // Remove entities first so that VLANs don't conflict.
        if (formData.entities.remove.length) {
          return Api
            .one('entity/' + formData.entities.remove.join(','))
            .patch({
              server_port_id: null,
            })
            .then(addEntities)
            ;
        }

        return addEntities();

        function addEntities() {
          if (formData.entities.add.length) {
            return Api
              .one('entity/' + formData.entities.add.join(','))
              .patch({
                server_port_id: port.id,
              })
              ;
          }
        }
      }

      function updateServerPort() {
        var data = {
          mac: serverForm.form.form[portPrefix+'mac'].$dirty ? port.input.mac : undefined,
          group_id: port.group.$dirty ? port.group.getSelected('id') : undefined,
          switch_port_id: port.switch.port.$dirty ? port.switch.port.getSelected('id') : undefined,
        };

        if (!_(data).values().reject(isUndefined).value().length) {
          return $q.when();
        }

        if (formData.id) {
          return $ports
            .one('' + formData.id)
            .patch(data)
            .then(updateExisting)
            ;
        }

        return $ports
          .post(data)
          .then(updateExisting)
          ;

        function updateExisting(response) {
          port.fromExisting(response, true);
        }
      }
    }

    function getData() {
      var data = cloneInputs(serverForm.input);
      var $partsDirty = serverForm.disks.$dirty ||
        serverForm.addOns.$dirty ||
        serverForm.cpu.$dirty ||
        serverForm.mem.$dirty;
      $partsDirty && (data.disks = ids(serverForm.disks));
      $partsDirty && (data.addons = ids(serverForm.addOns));
      $partsDirty && (data.cpu = serverForm.cpu.getSelected('id') || null);
      $partsDirty && (data.mem = serverForm.mem.getSelected('id') || null);

      if (typeof (data.billing || {}).date !== "undefined") {
        data.billing.date = serverForm.billing.date.value ?
          moment(serverForm.billing.date.value)
            .toISOString() :
          null;
      }

      return data;
    }

    function cloneInputs(input, keyPrefix) {
      var resObj = {};
      _.forOwn(input, function(value, key) {
        var keyWithPrefix = keyPrefix ? (keyPrefix+"."+key) : key;
        try { // throw error in console if input is not named properly
          if(_.isObject(value)) {
            var tmp = cloneInputs(value, keyWithPrefix);
            !_.isEmpty(tmp) && (resObj[key] = tmp);
          } else {
            if(serverForm.form.form[keyWithPrefix].$dirty) {
              resObj[key] = value;
            }
          }
        } catch(e) {
          console.error('Error. Input field "'+keyWithPrefix+'" is not named properly inside form. Each input should have name attribute set. Use dot notation names for fields that are inside of nested objects in INPUTS object.');
        }
      });
      return resObj;
    }

    function ids(multi) {
      return _(multi.items)
        .map('selected.id')
        .filter()
        .value()
        ;
    }

    function DiskSelector(selected) {
      var select = Select('part?part_type=disk');
      select.selected = selected || null;
      select.load();

      return select;
    }

    function AddOnSelector(selected) {
      var select = Select('part?part_type=add-on');
      select.selected = selected || null;
      select.load();

      return select;
    }
  }

  function isUndefined(val) {
    return typeof val === 'undefined';
  }
})();
