(function () {
  'use strict';

  var INPUTS = {
    srv_id: '',
    nickname: '',
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
  function ServerFormCtrl(_, Select, MultiInput, $rootScope, ServerConfig, $stateParams) {
    var serverForm = this;

    serverForm.$onInit = init;
    serverForm.switch = Select('switch').on('change', syncGroupFilter);
    serverForm.cpu = Select('part?part_type=cpu');
    serverForm.mem = Select('part?part_type=mem');
    serverForm.disks = MultiInput(DiskSelector)
      .setMax(ServerConfig.MAX_DISKS)
      .add();
    serverForm.addOns = MultiInput(AddOnSelector).add();
    serverForm.group = Select('group').on('change', function () {
      _.setContents(serverForm.entities.selected, []);
      syncEntityFilter();
    });
    serverForm.billing = {
      date: {
        value: null,
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
      var entityGroup = (serverForm.entities.selected[0] || {}).group || null;
      var entityGroupId = (entityGroup || {}).id || null;
      if (!entityGroup || serverForm.group.getSelected('id') == entityGroupId) {
        syncEntityFilter();
        return;
      }

      serverForm.group.selected = entityGroup;
      serverForm.group.fireChangeEvent();
    }

    function syncGroupFilter() {
      serverForm.group.filter({
        switch: serverForm.switch.getSelected('id'),
      }).load();
    }

    function storeState(response) {
      $rootScope.$evalAsync(function() {
        storeMulti(response.disks, serverForm.disks);
        storeMulti(response.addons, serverForm.addOns);

        serverForm.switch.selected = response.switch;
        syncGroupFilter();

        _.setContents(serverForm.entities.selected, response.entities);
        serverForm.group.selected = response.group;
        syncEntityFilter();

        serverForm.switchSpeed.selected = response.switch.speed;
        serverForm.client.selected = (response.access || {}).client;
        serverForm.billing.date.value = response.billing.date ? new Date(Date.parse(response.billing.date)) : null;
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
      data.switch.id = serverForm.switch.getSelected('id') || null;
      data.switch.speed = {
        id: serverForm.switchSpeed.getSelected('id') || null,
      };
      data.group = {
        id: serverForm.group.getSelected('id') || null,
      };
      data.client = {
        id: serverForm.client.getSelected('id') || null,
      };
      data.billing.date = serverForm.billing.date.value ? serverForm.billing.date.value.toUTCString() : null;

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
