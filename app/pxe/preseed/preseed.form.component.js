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
        input: '=',
      },
      controller: 'PreseedFormCtrl as preseedForm',
      transclude: true,
      templateUrl: 'app/pxe/preseed/preseed.form.html'
    })
    .controller('PreseedFormCtrl', PreseedFormCtrl)
    ;

  function PreseedFormCtrl() {
    var preseedForm = this;

    preseedForm.$onInit = init;

    //////////

    function init() {
      _.assign(preseedForm.input, INPUTS);
    }
  }
})();
