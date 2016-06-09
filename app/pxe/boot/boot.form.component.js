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

  function BootFormCtrl() {
    var bootForm = this;

    bootForm.$onInit = init;

    //////////

    function init() {
      bootForm.form.getData = getData;
      bootForm.input = bootForm.form.input = bootForm.form.input || {};
      _.assign(bootForm.input, INPUTS);
    }

    function getData() {
      return _.clone(bootForm.input);
    }
  }
})();
