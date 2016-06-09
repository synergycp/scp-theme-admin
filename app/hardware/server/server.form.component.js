(function () {
  'use strict';

  var INPUTS = {
    srv_id: '',
    mac: '',
    cpu: {
      id: null,
      name: '',
    },
    mem: {
      id: null,
      name: '',
    },
    disks: [{
      id: null,
      name: '',
    }],
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
      speed: null
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

  function ServerFormCtrl() {
    var serverForm = this;

    serverForm.$onInit = init;

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
