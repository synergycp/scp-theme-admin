(function () {
  'use strict';

  var INPUTS = {
    srv_id: '',
    mac: '',
    cpu: null,
    mem: null,
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
    access: {
      ipmi: false,
      switch: false,
      pxe: false,
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
  function ServerFormCtrl(_, Select, $rootScope, $stateParams) {
    var serverForm = this;

    serverForm.$onInit = init;
    serverForm.switch = Select('switch');
    serverForm.cpu = Select('part?part_type=cpu');
    serverForm.mem = Select('part?part_type=mem');
    serverForm.disks = {
      items: [],
      add: addDisk,
      rem: remDisk,
    };
    serverForm.disks.add();
    serverForm.addOns = {
      items: [],
      add: addAddOn,
      rem: remAddOn,
    };
    serverForm.addOns.add();
    serverForm.group = Select('group').on('change', function () {
      _.setContents(serverForm.entities.selected, []);
      syncEntityFilter();
    });
    serverForm.billing = {
      date: {
        value: new Date(),
        isOpen: false,
      },
    };
    serverForm.client = Select('client');
    serverForm.switchSpeed = Select('port-speed');
    serverForm.entities = Select('entity').multi().filter({
      available: true,
      allow_server_id: $stateParams.id || undefined,
    }).on('change', syncEntityToGroup);

    //////////

    function init() {
      serverForm.form.getData = getData;
      serverForm.input = serverForm.form.input = serverForm.form.input || {};
      _.assign(serverForm.input, INPUTS);

      if (!serverForm.form.on) {
        return;
      }

      serverForm.form.on(['load', 'change'], storeState);
    }

    function syncEntityToGroup() {
      serverForm.group.selected = serverForm.entity.selected;
      serverForm.group.fireChangeEvent();
    }

    function storeState(response) {
      $rootScope.$evalAsync(function() {
        storeMulti(response.disks, serverForm.disks);
        storeMulti(response.addons, serverForm.addOns);
        _.setContents(serverForm.entities.selected, response.entities);
        syncEntityFilter();
        serverForm.switch.selected = response.switch;
        serverForm.switchSpeed.selected = response.switch.speed;
        serverForm.group.selected = response.group;
        serverForm.client.selected = response.client;
        serverForm.billing.date.value = response.billing.date ? Date.parse(response.billing.date) : null;
      });
    }

    function syncEntityFilter() {
      serverForm.entities
        .clearFilter('extra_for_id')
        .clearFilter('ip_group')
        .filter({
          extra_for_id: (serverForm.entities.selected[0] || {}).id,
          ip_group: (serverForm.group.selected || {}).id,
        })
        .load();
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
      data.entities = _.map(serverForm.entities.selected, 'id');
      data.switch.id = serverForm.switch.getSelected('id');
      data.switch.speed = {
        id: serverForm.switchSpeed.getSelected('id'),
      };
      data.group = {
        id: serverForm.group.getSelected('id'),
      };
      data.client = {
        id: serverForm.client.getSelected('id'),
      };
      data.billing.date = ""+serverForm.billing.date.value;

      return data;
    }

    function addDisk(selected, key) {
      var select = Select('part?part_type=disk');
      select.selected = selected || null;
      select.load();
      key = typeof key === "undefined" ? serverForm.disks.items.length : key;
      var del = serverForm.disks.items.length > key;
      serverForm.disks.items.splice(key, del, select);

      return select;
    }

    function remDisk($index) {
      serverForm.disks.items.splice($index, 1);
    }

    function addAddOn(selected, key) {
      var select = Select('part?part_type=add-on');
      select.selected = selected || null;
      select.load();
      key = typeof key === "undefined" ? serverForm.addOns.items.length : key;
      var del = serverForm.addOns.items.length > key;
      serverForm.addOns.items.splice(key, del, select);

      return select;
    }

    function remAddOn($index) {
      serverForm.addOns.items.splice($index, 1);
    }

    function ids(multi) {
      return _(multi.items)
        .map('selected.id')
        .filter()
        .value()
        ;
    }
  }
})();
