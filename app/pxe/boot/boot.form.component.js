(function () {
  'use strict';

  var INPUTS = {
    name: '',
    body: '',
  };

  angular
    .module('app.pxe')
    .component('bootForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'BootFormCtrl as bootForm',
      transclude: true,
      templateUrl: 'app/pxe/boot/boot.form.html',
    })
    .controller('BootFormCtrl', BootFormCtrl)
    ;

  /**
   * @ngInject
   */
  function BootFormCtrl() {
    var bootForm = this;

    bootForm.$onInit = init;
    bootForm.input = _.clone(INPUTS);

    //////////

    function init() {
      fillFormInputs();

      bootForm.form.getData = getData;
      (bootForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(bootForm.input);
    }

    function fillFormInputs() {
      _.overwrite(bootForm.input, bootForm.form.input);
    }
  }
})();
