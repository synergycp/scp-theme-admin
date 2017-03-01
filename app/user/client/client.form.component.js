(function () {
  'use strict';

  var INPUTS = {
    email: '',
    password: '',
    first: '',
    last: '',
    billing: {
      id: '',
      ignoreAutoSuspend: false,
    },
  };

  angular
    .module('app.user')
    .component('clientForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'ClientFormCtrl as clientForm',
      transclude: true,
      templateUrl: 'app/user/client/client.form.html',
    })
    .controller('ClientFormCtrl', ClientFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ClientFormCtrl(Select) {
    var clientForm = this;

    clientForm.$onInit = init;
    clientForm.input = _.clone(INPUTS);
    clientForm.billing = {
      integration: Select('integration'),
    };

    //////////

    function init() {
      clientForm.form.getData = getData;
      fillFormInputs();

      (clientForm.form.on || function() {})(['change', 'load'], storeState);
    }

    function getData() {
      var data = _.clone(clientForm.input);

      data.billing = data.billing || {};
      var integration = clientForm.billing.integration;
      if (integration.$dirty) {
        data.billing.integration = {
          id: integration.getSelected('id') || null,
        };

        if (!data.billing.integration.id) {
          data.billing.id = null;
        }
      }

      return data;
    }

    function fillFormInputs() {
      _.overwrite(clientForm.input, clientForm.form.input);
    }

    function storeState(response) {
      fillFormInputs();
      clientForm.billing.integration.selected = response.integration;
    }
  }
})();
