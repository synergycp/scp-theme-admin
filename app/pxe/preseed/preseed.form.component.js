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
      templateUrl: 'app/pxe/preseed/preseed.form.html'
    })
    .controller('PreseedFormCtrl', PreseedFormCtrl)
    ;

  /**
   * @ngInject
   */
  function PreseedFormCtrl() {
    var preseedForm = this;

    preseedForm.$onInit = init;

    //////////

    function init() {
      preseedForm.form.getData = getData;
      preseedForm.input = preseedForm.form.input = preseedForm.form.input || {};
      _.assign(preseedForm.input, INPUTS);
    }

    function getData() {
      return _.clone(preseedForm.input);
    }
  }
})();
