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
      templateUrl: 'app/hardware/switch/speed/speed.form.html'
    })
    .controller('SpeedFormCtrl', SpeedFormCtrl)
    ;

  /**
   * @ngInject
   */
  function SpeedFormCtrl(Select) {
    var speedForm = this;

    speedForm.$onInit = init;

    //////////

    function init() {
      speedForm.form.getData = getData;
      speedForm.input = speedForm.form.input = speedForm.form.input || {};
      _.assign(speedForm.input, INPUTS);
    }

    function getData() {
      return _.clone(speedForm.input);
    }
  }
})();
