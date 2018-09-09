(function () {
  'use strict';

  var INPUTS = {
    srv_id: '',
    nickname: '',
    billing: {
      id: '',
      date: '',
      integration: {
        id: '',
      },
    },
  };

  angular
    .module('app.hardware')
    .component('serverForm', {
      require: {
      },
      bindings: {
        isCreating: '=?',
        alwaysDirty: '=?',
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
  function ServerFormCtrl(_, $scope, Api, Select, Modal, Alert, ServerFormPort, ServerFormControl, MultiInput, $rootScope, ServerConfig, $stateParams, $q, $filter, moment) {
    var serverForm = this;
    var $ports, $controls;

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
    serverForm.controls = [];
    serverForm.controls.add = addControl;
    serverForm.controls.remove = removeControl;
    serverForm.billing = {
      integration: Select('integration'),
      date: {
        value: '',
        options: {
          locale: {
            format: 'MM/DD/YYYY h:mm A',
            cancelLabel: 'Clear',
          },
          autoApply: true,
          autoUpdateInput: false,
          singleDatePicker: true,
          timePicker: true,
          timePickerIncrement: 30,
          eventHandlers: {
            'cancel.daterangepicker': function (ev, picker) {
              serverForm.billing.date.value = '';
            },
          },
        },
        empty: emptyBillingDate,
      },
    };

    //////////

    function init() {
      $scope.$watch('serverForm.billing.date.value', function () {
        serverForm.form.form['billing.date'].$dirty = true;
      });
      _.defaults(serverForm, {
        alwaysDirty: false,
        isCreating: false,
      });
      serverForm.form.getData = getData;
      fillFormInputs();

      if (!serverForm.form.on) {
        return;
      }

      serverForm.form
        .on(['load', 'change', 'created'], storeState)
        .on(['saving', 'created'], function () {
          // Control Port Forwarding depends on port IP group so controls must come after.
          return savePorts().then(saveControls);
        })
        .on(['change'], setFormPristine) // when saving completed
      ;

      if ($stateParams.id) {
        $ports = Api.all('server/'+$stateParams.id+'/port');
        $ports
          .getList()
          .then(storePorts)
          .then(storePortsBandwidth)
          .then(setFormPristine)
        ;
        $controls = Api.all('server/'+$stateParams.id+'/control');
        $controls
          .getList()
          .then(storeControls)
          .then(setFormPristine)
        ;
      }
    }

    function emptyBillingDate() {
      serverForm.form.form['billing.date'].$dirty = serverForm.billing.date.value != '';
      serverForm.billing.date.value = '';
    }

    function addPort() {
      serverForm.ports.push(ServerFormPort(serverForm.ports.length));
    }

    function removePort(port) {
      if (port.id) {
        return confirmRemove(port)
          .then(removeFromDatabase)
          .then(removeFromList)
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

    function addControl() {
      serverForm.controls.push(ServerFormControl());
    }

    function removeControl(control) {
      if (control.id) {
        return confirmRemoveControl(control)
          .then(removeFromList)
          .then(removeFromDatabase);
      }

      removeFromList();

      function removeFromDatabase() {
        return $controls.one(''+control.id).remove();
      }

      function removeFromList() {
        _.remove(serverForm.controls, control);
      }
    }

    function confirmRemoveControl(control) {
      return Modal
        .confirm([control.original], 'server.form.control.remove')
        .open()
        .result
        ;
    }

    function confirmRemove(port) {
      return Modal
        .confirm([port.original], 'server.form.port.remove')
        .open()
        .result
        ;
    }

    function storePorts(response) {
      _.each(response, function (portData) {
        var port = ServerFormPort(serverForm.ports.length);

        port.fromExisting(portData);
        port.loadEntities();
        serverForm.ports.push(port);
      });
    }

    function storePortsBandwidth() {
      return $q.all(
        _.map(serverForm.ports, function(port) {
          return $ports.get(port.id+'/bandwidth/usage')
            .then(function(bandwidthData) {
              if(bandwidthData.data[0]) {
                port.bandwidthUsage = bandwidthData.data[0];
                port.max_bandwidth = $filter('bitsToSize')(bandwidthData.data[0].max);
              }
            })
        })
      );
    }

    function storeControls(response) {
      _.each(response, function (controlData) {
        var control = ServerFormControl();

        control.fromExisting(controlData);
        serverForm.controls.push(control);
      });
    }

    function fillFormInputs() {
      _.overwrite(serverForm.input, serverForm.form.input);
    }

    function storeState(response) {
      $ports = Api.all('server/'+response.id+'/port');
      $controls = Api.all('server/'+response.id+'/control');

      $rootScope.$evalAsync(function() {
        fillFormInputs();

        storeMulti(response.disks, serverForm.disks);
        storeMulti(response.addons, serverForm.addOns);

        serverForm.cpu.selected = response.cpu;
        serverForm.mem.selected = response.mem;
        serverForm.billing.integration.selected = response.billing.integration;

        serverForm.billing.date.value = response.billing.date ?
          Date.parse(response.billing.date) : '';
        serverForm.form.form['billing.date'].$dirty = false;
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
      return _.reduce(serverForm.ports, function (previousRequest, port, portIndex) {
        return previousRequest.then(
          savePortChanges.bind(null, port, portIndex)
        );
      }, $q.when())
        .then(function () {
          // setFormPristine();
          serverForm.form.fire('created.relations');
        });
    }

    function savePortChanges(port, portIndex) {
      var portData = port.data();
      var portPrefix = 'port-'+portIndex+'.';
      var switchId = portData.switch.id;
      var switchPortId = portData.switch.port.id;
      var speedId = portData.switch.speed.id;

      var dirtySwitchPort =
        serverForm.alwaysDirty ||
        port.switch.$dirty ||
        port.switch.port.$dirty ||
        port.switch.speed.$dirty;

      return $q.all([
        updateServerPort()
          .then(updateSwitchPort)
          .then(updatePortBandwidth)
          .then(updateEntities),
      ]).then(port.$setPristine);

      function updateSwitchPort() {
        if (!dirtySwitchPort || !switchId || !switchPortId) {
          return $q.when();
        }

        return Api
          .one(
            'switch/' + switchId + '/port/' + switchPortId
          )
          .patch({
            port_speed_id: speedId || null,
            owner: {
              type: 'server.port',
              id: port.id,
            }
          })
          ;
      }

      function updateEntities() {
        // Remove entities first so that VLANs don't conflict.
        if (portData.entities.remove.length) {
          return Api
            .one('entity/' + portData.entities.remove.join(','))
            .patch({
              server_port_id: null,
            })
            .then(addEntities)
            ;
        }

        return addEntities();

        function addEntities() {
          if (!portData.entities.add.length) {
            return $q.when();
          }

          return Api
            .one('entity/' + portData.entities.add.join(','))
            .patch({
                server_port_id: port.id,
            })
            ;
        }
      }

      function updateServerPort() {
        var data = {
          mac: serverForm.alwaysDirty || serverForm.form.form[portPrefix+'mac'].$dirty ? port.input.mac : undefined,
          group_id: serverForm.alwaysDirty || port.group.$dirty ? port.group.getSelected('id') : undefined,
        };

        if (!_(data).values().reject(isUndefined).value().length) {
          return $q.when();
        }

        if (port.id && !serverForm.isCreating) {
          return $ports
            .one('' + port.id)
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
          return response;
        }
      }

      function updatePortBandwidth() {
        if (!serverForm.alwaysDirty &&
            !(serverForm.form.form[portPrefix+'max_bandwidth'] && serverForm.form.form[portPrefix+'max_bandwidth'].$dirty) &&
            !serverForm.form.form['billing.date'].$dirty &&
            !(port.switch.port && port.switch.port.$dirty) // save bandwidth if port changed
        ) {
          return;
        }

        var startDate = serverForm.billing.date ?
          moment(serverForm.billing.date.value).toISOString() :
          undefined;

        if (port.id && !serverForm.isCreating && port.max_bandwidth && port.bandwidthUsage && !port.switch.port.$dirty) {
          return $ports
            .one(port.id +'/bandwidth/usage/'+port.bandwidthUsage.id)
            .patch({
              "max": $filter('sizeToBits')(port.max_bandwidth),
              "started_at": startDate
            })
          ;
        }
        if(port.max_bandwidth && (!port.bandwidthUsage || port.switch.port.$dirty)) {
          return $ports
            .all(port.id +'/bandwidth/usage')
            .post({
              "max": $filter('sizeToBits')(port.max_bandwidth),
              "started_at": startDate
            })
            .then(function(bandwidthData) {
              port.bandwidthUsage = bandwidthData.response.data;
              port.max_bandwidth = $filter('bitsToSize')(bandwidthData.response.data.max);
            })
          ;
        }

        if(!port.max_bandwidth && port.bandwidthUsage) {
          return $ports
            .one(port.id +'/bandwidth/usage/'+port.bandwidthUsage.id)
            .remove()
            .then(function() {
              port.bandwidthUsage = null;
            })
          ;
        }

      }
    }

    function saveControls() {
      return $q.all(
        _.map(serverForm.controls, saveControlChanges)
      ).then(function () {
        serverForm.form.fire('created.relations');
      });
    }

    function saveControlChanges(control, controlIndex) {
      var controlPrefix = 'control-'+controlIndex+'.';

      return $q.all([
        updateServerControl(),
      ]).then(control.$setPristine);

      function updateServerControl() {
        var form = serverForm.form.form;
        var data = {
          hostname: serverForm.alwaysDirty || (form[controlPrefix+'hostname'] || {}).$dirty ? control.input.hostname : undefined,
          client_user: serverForm.alwaysDirty || (form[controlPrefix+'client.username'] || {}).$dirty ? control.input.client.username : undefined,
          client_password: serverForm.alwaysDirty || (form[controlPrefix+'client.password'] || {}).$dirty ? control.input.client.password : undefined,
          admin_user: serverForm.alwaysDirty || (form[controlPrefix+'admin.username'] || {}).$dirty ? control.input.admin.username : undefined,
          admin_password: serverForm.alwaysDirty || (form[controlPrefix+'admin.password'] || {}).$dirty ? control.input.admin.password : undefined,
          type: serverForm.alwaysDirty || control.type.$dirty ? {
            id: control.type.getSelected('id')
          } : undefined,
          port_forwarding_type: serverForm.alwaysDirty || (form[controlPrefix+'port_forwarding_type'] || {}).$dirty ? control.input.port_forwarding_type : undefined
        }

        if (!_(data).values().reject(isUndefined).value().length) {
          return $q.when();
        }

        if (control.id && !serverForm.isCreating) {
          return $controls
            .one('' + control.id)
            .patch(data)
            .then(updateExisting)
            ;
        }

        return $controls
          .post(data)
          .then(updateExisting)
          ;

        function updateExisting(response) {
          control.fromExisting(response, true);
          return response;
        }
      }
    }

    function getData() {
      var data = cloneInputs(serverForm.input);
      var $partsDirty = serverForm.alwaysDirty ||
        serverForm.disks.$dirty ||
        serverForm.addOns.$dirty ||
        serverForm.cpu.$dirty ||
        serverForm.mem.$dirty;
      if ($partsDirty) {
        data.disks = ids(serverForm.disks);
        data.addons = ids(serverForm.addOns);
        data.cpu = serverForm.cpu.getSelected('id') || null;
        data.mem = serverForm.mem.getSelected('id') || null;
      }
      data.billing = data.billing || {};
      var integration = serverForm.billing.integration;
      if (integration.$dirty) {
        data.billing.integration = {
          id: integration.getSelected('id') || null,
        };

        if (!data.billing.integration.id) {
          data.billing.id = null;
        }
      }

      if (typeof data.billing.date !== "undefined") {
        data.billing.date = serverForm.billing.date.value ?
          moment(serverForm.billing.date.value)
            .toISOString() :
          null;
      }

      if(_.isEmpty(data.billing)) delete data.billing;

      serverForm.ports.map(function (port) {
        var portData = port.data();
        var switchId = portData.switch.id;
        var switchPortId = portData.switch.port.id;

        if (!switchId || !switchPortId) {
          Alert.warning("Please specify a switch port.");
          throw new Error('Please specify a switch port.');
        }
      })

      return data;
    }

    function cloneInputs(input, keyPrefix) {
      var ignore = ['billing.integration.name', 'billing.integration'];
      var resObj = {};
      _.forOwn(input, function(value, key) {
        var keyWithPrefix = keyPrefix ? (keyPrefix+"."+key) : key;
        try { // throw error in console if input is not named properly
          if(_.isObject(value)) {
            var tmp = cloneInputs(value, keyWithPrefix);
            !_.isEmpty(tmp) && (resObj[key] = tmp);
          } else if (ignore.indexOf(keyWithPrefix) === -1) {
            if(serverForm.alwaysDirty || serverForm.form.form[keyWithPrefix].$dirty) {
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

    function setFormPristine() {
      serverForm.disks.$dirty =
        serverForm.addOns.$dirty =
        serverForm.cpu.$dirty =
        serverForm.mem.$dirty =
        false;
      serverForm.billing.integration.$dirty = false;
      _.each(serverForm.ports, function(port) {
        port.$setPristine();
      })
      _.each(serverForm.form.form, function (field, key) {
        if (field && field.$setDirty) field.$setDirty(false);
      });
      serverForm.form.form.$setPristine();
    }
  }

  function isUndefined(val) {
    return typeof val === 'undefined';
  }
})();
