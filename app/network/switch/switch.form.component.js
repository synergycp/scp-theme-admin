(function () {
  'use strict';

  var SNMP_VERSION = {
    V2c: 0,
    V1: 1,
  };

  var INPUTS = {
    name: '',
    type: 0,
    ip: '',
    port: '',
    ssh_user: '',
    ssh_pass: '',
    ssh_en_pass: '',
    snmp_pass: '',
    allow_vlan_tagging: false,
    snmp_use_32_bit: false,
    snmp_version: SNMP_VERSION.V2c,
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
      templateUrl: 'app/network/switch/switch.form.html'
    })
    .controller('SwitchFormCtrl', SwitchFormCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchFormCtrl(Todo, Select, _, Api) {
    var switchForm = this;


    Api.all('switch/type').getList().then(function (result) {
      _.setContents(switchForm.switchTypes, result);
      switchForm.input.type = switchForm.input.type || switchForm.switchTypes[0].slug;
    });

    switchForm.switchTypes = [];
    switchForm.input = _.clone(INPUTS);
    switchForm.groups = Select('group').multi();
    switchForm.SNMP_VERSION = SNMP_VERSION;

    switchForm.$onInit = init;

    //////////

    function init() {
      fillFormInputs();
      switchForm.form.getData = getData;
      if(switchForm.form.on) {
        switchForm.form.on(['change', 'load'], function (response) {
          fillFormInputs();

          _.setContents(switchForm.groups.selected, response.groups);
        });
        switchForm.form.on(['create'], Todo.refresh);
      }
    }

    function fillFormInputs() {
      _.overwrite(switchForm.input, switchForm.form.input);
    }

    function getData() {
      var data = _.clone(switchForm.input);

      data.groups = _.map(switchForm.groups.selected, 'id');

      return data;
    }
  }
})();
