(function () {
  'use strict';

  var INPUTS = {
    name: '',
    subject: '',
    body: '',
  };

  angular
    .module('app.system')
    .component('emailForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'EmailFormCtrl as emailForm',
      transclude: true,
      templateUrl: 'app/system/email/email.form.html',
    })
    .controller('EmailFormCtrl', EmailFormCtrl)
    ;

  /**
   * @ngInject
   */
  function EmailFormCtrl() {
    var emailForm = this;

    emailForm.$onInit = init;

    //////////

    function init() {
      emailForm.form.getData = getData;
      emailForm.input = emailForm.form.input = emailForm.form.input || {};
      _.assign(emailForm.input, INPUTS);
    }

    function getData() {
      return _.clone(emailForm.input);
    }
  }
})();
