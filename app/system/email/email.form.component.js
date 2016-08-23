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
    emailForm.input = _.clone(INPUTS);

    //////////

    function init() {
      emailForm.form.getData = getData;
      fillFormInputs();

      (emailForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(emailForm.input);
    }

    function fillFormInputs() {
      _.overwrite(emailForm.input, emailForm.form.input);
    }
  }
})();
