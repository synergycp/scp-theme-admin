(function () {
  'use strict';

  var INPUTS = {
    srv_id: '',
    nickname: '',
    mac: '',
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
    switch: {
      port: '',
    },
    billing: {
      id: '',
      max_bandwidth: '',
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

    //////////

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

      function removeFromDatabase() {
        return port.original.remove();
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

      serverForm.form.on(['load', 'change'], storeState);
      serverForm.form.on(['saving', 'created'], savePorts);

      $ports = Api.all('server/'+$stateParams.id+'/port');
      $ports
        .getList()
        .then(storePorts)
      ;
    }

    function storePorts(response) {
      _.each(response, function (portData) {
        var port = ServerFormPort();

        port.fromExisting(portData);
        serverForm.ports.push(port);
      });
    }

    function fillFormInputs() {
      _.overwrite(serverForm.input, serverForm.form.input);
    }

    function storeState(response) {
      $rootScope.$evalAsync(function() {
        fillFormInputs();

        storeMulti(response.disks, serverForm.disks);
        storeMulti(response.addons, serverForm.addOns);

        serverForm.cpu.selected = response.cpu;
        serverForm.mem.selected = response.mem;
      });
    }

    function storeMulti(items, target) {
      target.items.splice(items.length);
      _.map(items, change);

      // Always guarantee at least one input.
      if (!items.length) {
        target.add();
      }

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

    function getData() {
      var data = _.clone(serverForm.input);

      data.disks = ids(serverForm.disks);
      data.addons = ids(serverForm.addOns);
      data.cpu = serverForm.cpu.getSelected('id') || null;
      data.mem = serverForm.mem.getSelected('id') || null;

      return data;
    }

    function savePorts() {
      return $q.all(
        _.map(serverForm.ports, savePortChanges)
      );
    }

    function savePortChanges(port) {
      var formData = port.data();
      var serverData = {
        mac: formData.mac,
        group_id: formData.group.id,
        switch_port_id: formData.switch.port.id,
      };

      return $q.all([
        updateEntities(),
        updateSwitchPort(),
      ]).then(updateServerPort);

      function updateSwitchPort() {
        return Api
          .one('switch/'+formData.switch.id+'/port/'+formData.switch.port.id)
          .patch({
            port_speed_id: formData.switch.speed.id,
          })
          ;
      }

      function updateEntities() {
        if (formData.entities.remove.length) {
          return Api
            .one('entity/' + formData.entities.remove.join(','))
            .patch({
              switch_port_id: null,
            })
          ;
        }

        if (formData.entities.add.length) {
          return Api
            .one('entity/' + formData.entities.add.join(','))
            .patch({
              switch_port_id: formData.switch.port.id,
            })
            ;
        }
      }

      function updateServerPort() {
        if (formData.id) {
          return $ports
            .one(''+formData.id)
            .patch(serverData)
            .then(updateExisting)
            ;
        }

        return $ports
          .post(serverData)
          .then(updateExisting)
          ;

        function updateExisting(response) {
          port.fromExisting(response);
        }
      }
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
})();
