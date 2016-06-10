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

  function SwitchFormCtrl(Api) {
    var switchForm = this;
    var $groups = Api.all('group');

    switchForm.switchTypes = ['Dell', 'Juniper'];
    switchForm.groups = {
      items: [],
      selected: [],
      load: loadGroups,
      notSelected: groupNotSelected,
    };

    switchForm.$onInit = init;

    //////////

    function init() {
      switchForm.form.getData = getData;
      switchForm.input = switchForm.form.input = switchForm.form.input || {};
      _.assign(switchForm.input, INPUTS);

      if (switchForm.form.on) {
        switchForm.form.on(['change', 'load'], function (response) {
          var items = switchForm.groups.selected;

          _.setContents(items, response.groups);
        });
      }
    }

    function getData() {
      var data = _.clone(switchForm.input);

      data.groups = _.map(switchForm.groups.selected, 'id');

      return data;
    }

    function loadGroups(search) {
      $groups.getList({ q: search })
        .then(storeGroups)
        ;
    }

    function storeGroups(groups) {
      _.setContents(switchForm.groups.items, groups);
    }

    function groupNotSelected(group) {
      return !_.some(switchForm.groups.selected, {id: group.id});
    }
  }
})();
