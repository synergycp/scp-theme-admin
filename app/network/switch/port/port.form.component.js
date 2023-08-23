(function () {
  'use strict';

  var INPUTS = {
    name: '',
    hubId: null
  };

  angular
    .module('app.network.switch.port')
    .component('portForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'PortFormCtrl as portForm',
      transclude: true,
      templateUrl: 'app/network/switch/port/port.form.html',
    })
    .controller('PortFormCtrl', PortFormCtrl)
    ;

  /**
   * @ngInject
   */
  function PortFormCtrl(Select, Api) {
    var portForm = this;

    portForm.$onInit = init;
    portForm.input = _.clone(INPUTS);


    //////////

    function init() {
      portForm.form.getData = getData;
      fillFormInputs();

      (portForm.form.on || function () { })(['change', 'load'], storeState);

    }

    function getData(hubId) {
      var data = _.clone(portForm.input);
      data.hubId = hubId;
      return data;
    }

    function fillFormInputs() {
      _.overwrite(portForm.input, portForm.form.input);
    }

    function storeState(response) {
      fillFormInputs();
    }
  }
})();
