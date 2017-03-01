(function () {
  'use strict';

  var INPUTS = {
    name: '',
    subject: '',
    body: '',
  };

  angular
    .module('app.system')
    .component('integrationForm', {
      require: {
      },
      bindings: {
        form: '='
      },
      controller: 'IntegrationFormCtrl as integrationForm',
      transclude: true,
      templateUrl: 'app/system/integration/integration.form.html',
    })
    .controller('IntegrationFormCtrl', IntegrationFormCtrl)
    ;

  /**
   * @ngInject
   */
  function IntegrationFormCtrl() {
    var integrationForm = this;

    integrationForm.$onInit = init;
    integrationForm.input = _.clone(INPUTS);

    //////////

    function init() {
      integrationForm.form.getData = getData;
      fillFormInputs();

      (integrationForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(integrationForm.input);
    }

    function fillFormInputs() {
      _.overwrite(integrationForm.input, integrationForm.form.input);
    }
  }
})();
