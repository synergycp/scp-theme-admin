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
  function ServerFormCtrl(_, Api, Select, MultiInput, $rootScope, ServerConfig, $stateParams, moment) {
    var serverForm = this;
    var $entities = Api.all('entity');

    serverForm.$onInit = init;
    serverForm.input = _.clone(INPUTS);
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
            'cancel.daterangepicker': function (ev, picker) {
              serverForm.billing.date.value = '';
            },
          }
        },
      },
    };
    serverForm.switchSpeed = Select('port-speed');
    serverForm.entities = Select('entity').multi().filter({
      available: true,
      allow_server_id: $stateParams.id || undefined,
    }).on('change', syncEntityToGroup);

    //////////

    function init() {
      serverForm.form.getData = getData;
      fillFormInputs();

      if (!serverForm.form.on) {
        return;
      }

      serverForm.form.on(['load', 'change'], storeState);
    }

    function fillFormInputs() {
      _.overwrite(serverForm.input, serverForm.form.input);
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
        fillFormInputs();

        storeMulti(response.disks, serverForm.disks);
        storeMulti(response.addons, serverForm.addOns);

        serverForm.switch.selected = response.switch;
        syncGroupFilter();

        serverForm.group.selected = response.group;
        serverForm.cpu.selected = response.cpu;
        serverForm.mem.selected = response.mem;

        serverForm.switchSpeed.selected = response.switch && response.switch.speed;
        serverForm.billing.date.value = response.billing.date ?
          Date.parse(response.billing.date) : '';
      });

      $entities
        .getList({ server: response.id })
        .then(storeEntities)
        ;
    }

    function storeEntities(response) {
      _.setContents(serverForm.entities.selected, response);

      syncEntityFilter();
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

    function getData() {
      var data = cloneInputs(serverForm.input);
      serverForm.disks.$dirty && (data.disks = ids(serverForm.disks));
      serverForm.addOns.$dirty && (data.addons = ids(serverForm.addOns));
      
      serverForm.entities.$dirty && (data.entities = _.map(serverForm.entities.selected, 'id'));
      
      if(serverForm.switch.$dirty) {
        if(!data.switch) data.switch = {};
        data.switch.id = (serverForm.switch.getSelected('id') || null);
      }
      data.switch && serverForm.switchSpeed.$dirty && (data.switch.speed = {
          id: serverForm.switchSpeed.getSelected('id') || null,
        });
      serverForm.group.$dirty && (data.group = {
        id: serverForm.group.getSelected('id') || null,
      });
      serverForm.cpu.$dirty && (data.cpu = serverForm.cpu.getSelected('id') || null);
      serverForm.mem.$dirty && (data.mem = serverForm.mem.getSelected('id') || null);
      serverForm.billing.date.value && (data.billing.date = serverForm.billing.date.value ? moment(serverForm.billing.date.value).toISOString() : null);
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
              resObj[key] = value
            }
          }
        } catch(e) {
          console.error('Error. Input field "'+keyWithPrefix+'" is not named properly inside form. Each input should have name attribute set. Use dot notation names for fields that are inside of nested objects in INPUTS object.');
        }
      })
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
})();
