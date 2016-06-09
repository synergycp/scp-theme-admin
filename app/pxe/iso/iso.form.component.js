(function () {
  'use strict';

  var INPUTS = {
    name: '',
    folder: '',
    url: '',
  };

  angular
    .module('app.pxe')
    .component('isoForm', {
      require: {
      },
      bindings: {
        form: '=',
        create: '@?',
      },
      controller: 'ISOFormCtrl as isoForm',
      transclude: true,
      templateUrl: 'app/pxe/iso/iso.form.html',
    })
    .controller('ISOFormCtrl', ISOFormCtrl)
    ;

  function ISOFormCtrl() {
    var isoForm = this;

    isoForm.create = false;

    isoForm.$onInit = init;

    //////////

    function init() {
      isoForm.form.getData = getData;
      isoForm.input = isoForm.form.input = isoForm.form.input || {};
      _.assign(isoForm.input, INPUTS);
    }

    function getData() {
      return _.clone(isoForm.input);
    }
  }
})();
