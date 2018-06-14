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
      templateUrl: 'app/network/switch/switch.form.html'
    })
    .controller('SwitchFormCtrl', SwitchFormCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchFormCtrl(Todo, Select, _) {
    var switchForm = this;

    switchForm.switchTypes = ['Dell', 'Juniper', 'Dell PowerConnect 6248', 'Brocade'];
    switchForm.input = _.clone(INPUTS);
    switchForm.groups = Select('group').multi();

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
