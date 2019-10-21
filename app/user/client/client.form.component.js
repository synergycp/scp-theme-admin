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
    sub_super_client_access: true,
    sendEmail: {
      welcome: true,
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
  function ClientFormCtrl(Select, Api) {
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
      (clientForm.form.on || function() {})('created', function (result) {
        return clientForm.input.sendEmail.welcome && Api.all('client/'+result.id+'/email').post({
          type: 'client-account-created',
        });
      });
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
