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
      id: null,
      port: '',
      speed: null,
    },
    billing: {
      id: '',
      date: '',
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
  function ServerFormCtrl(_, Select) {
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
    serverForm.group = Select('group');
    serverForm.client = Select('client');
    serverForm.switchSpeed = Select('port-speed');
    serverForm.entities = Select('entity').multi();

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

    function storeState(response) {
      storeMulti(response.disks, serverForm.disks);
      storeMulti(response.addons, serverForm.addOns);
      _.setContents(serverForm.entities.selected, response.entities);
    }

    function storeMulti(items, target) {
      target.items.splice(items.length-1);
      _(items)
        .filter(hasChanged)
        .map(deleteCurrent)
        .map(target.add)
        .value()
        ;

      function hasChanged (disk, key) {
        var currentSelector = target.items[key];
        if (!currentSelector) {
          return true;
        }

        var selected = currentSelector.selected;
        return !selected || selected.id != disk.id;
      }

      function deleteCurrent(item, key) {
        target.rem(key);

        return item;
      }
    }

    function getData() {
      var data = _.clone(serverForm.input);

      data.disks = ids(serverForm.disks);
      data.addons = ids(serverForm.addOns);
      data.entities = ids(serverForm.entities);

      return data;
    }

    function addDisk(selected) {
      var select = Select('part?part_type=disk');
      select.selected = selected || null;
      serverForm.disks.items.push(select);

      return select;
    }

    function remDisk($index) {
      serverForm.disks.items.splice($index, 1);
    }

    function addAddOn(selected) {
      var select = Select('part?part_type=add-on');
      select.selected = selected || null;
      serverForm.addOns.items.push(select);

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
