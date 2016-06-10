(function () {
  'use strict';

  var INPUTS = {
    srv_id: '',
    mac: '',
    cpu: null,
    mem: null,
    disks: [null],
    entities: [],
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
    serverForm.disk = Select('part?part_type=disk');
    serverForm.addon = Select('part?part_type=add-on');
    serverForm.group = Select('group');
    serverForm.client = Select('client');
    serverForm.switchSpeed = Select('port-speed');
    serverForm.entities = Select('entity');

    //////////

    function init() {
      serverForm.form.getData = getData;
      serverForm.input = serverForm.form.input = serverForm.form.input || {};
      _.assign(serverForm.input, INPUTS);
    }

    function getData() {
      return _.clone(serverForm.input);
    }
  }
})();
