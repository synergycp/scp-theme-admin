(function () {
  'use strict';

  var INPUTS = {
    name: '',
    description: '',
    body: '',
    is_installable: false,
  };

  angular
    .module('app.pxe')
    .component('preseedForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'PreseedFormCtrl as preseedForm',
      transclude: true,
      templateUrl: 'app/pxe/preseed/preseed.form.html',
    })
    .controller('PreseedFormCtrl', PreseedFormCtrl)
    ;

  /**
   * @ngInject
   */
  function PreseedFormCtrl() {
    var preseedForm = this;

    preseedForm.$onInit = init;
    preseedForm.input = _.clone(INPUTS);

    //////////

    function init() {
      fillFormInputs();

      preseedForm.form.getData = getData;
      (preseedForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(preseedForm.input);
    }

    function fillFormInputs() {
      _.overwrite(preseedForm.input, preseedForm.form.input);
    }
  }
})();
