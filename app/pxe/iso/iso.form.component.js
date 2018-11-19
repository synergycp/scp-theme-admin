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

  /**
   * @ngInject
   */
  function ISOFormCtrl() {
    var isoForm = this;

    isoForm.create = false;

    isoForm.$onInit = init;
    isoForm.input = _.clone(INPUTS);

    //////////

    function init() {
      fillFormInputs();

      isoForm.form.getData = getData;
      (isoForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(isoForm.input);
    }

    function fillFormInputs() {
      _.overwrite(isoForm.input, isoForm.form.input);
    }
  }
})();
