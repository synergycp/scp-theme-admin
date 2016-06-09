(function () {
  'use strict';

  var INPUTS = {
    name: '',
    type: 0,
    ip: '',
    port: '',
    ssh_user: '',
    ssh_pass: '',
    ssh_en_pass: '',
    snmp_pass: '',
  };

  angular
    .module('app.hardware')
    .component('switchForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'SwitchFormCtrl as switchForm',
      transclude: true,
      templateUrl: 'app/hardware/switch/switch.form.html'
    })
    .controller('SwitchFormCtrl', SwitchFormCtrl)
    ;

  function SwitchFormCtrl() {
    var switchForm = this;

    switchForm.switchTypes = ['Dell', 'Juniper'];

    switchForm.$onInit = init;

    //////////

    function init() {
      switchForm.form.getData = getData;
      switchForm.input = switchForm.form.input = switchForm.form.input || {};
      _.assign(switchForm.input, INPUTS);
    }

    function getData() {
      return _.clone(switchForm.input);
    }
  }
})();
