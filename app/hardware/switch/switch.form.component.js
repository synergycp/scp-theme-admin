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

  /**
   * @ngInject
   */
  function SwitchFormCtrl(Select, _) {
    var switchForm = this;

    switchForm.switchTypes = ['Dell', 'Juniper'];
    switchForm.input = _.clone(INPUTS);
    switchForm.groups = Select('group').multi();

    switchForm.$onInit = init;

    //////////

    function init() {
      fillFormInputs();
      switchForm.form.getData = getData;
      (switchForm.form.on || function() {})(['change', 'load'], function (response) {
        fillFormInputs();

        _.setContents(switchForm.groups.selected, response.groups);
      });
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
