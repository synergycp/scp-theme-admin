(function () {
  'use strict';

  var INPUTS = {
    name: '',
    billing_id: null,
    speed: '',
  };

  angular
    .module('app.hardware')
    .component('speedForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'SpeedFormCtrl as speedForm',
      transclude: true,
      templateUrl: 'app/network/switch/speed/speed.form.html',
    })
    .controller('SpeedFormCtrl', SpeedFormCtrl)
    ;

  /**
   * @ngInject
   */
  function SpeedFormCtrl(Select, _) {
    var speedForm = this;

    speedForm.$onInit = init;
    speedForm.input = _.clone(INPUTS);

    //////////

    function init() {
      speedForm.form.getData = getData;
      fillFormInputs();

      (speedForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(speedForm.input);
    }

    function fillFormInputs() {
      _.overwrite(speedForm.input, speedForm.form.input);
    }
  }
})();
