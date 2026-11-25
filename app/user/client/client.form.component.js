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
    sendEmail: {
      welcome: true,
    },
    // [BA-404]
    auth: {},
    sub_clients: {},
  };
  var DEFAULT_SSO_ONLY = 'client_default_sso_only';
  var DEFAULT_SUB_CLIENTS_DISABLED = 'client_default_sub_clients_disabled';

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
    clientForm.input.auth = {};
    clientForm.input.sub_clients = {};
    clientForm.billing = {
      integration: Select('integration'),
    };

    //////////

    function init() {
      clientForm.form.getData = getData;
      fillFormInputs();

      (clientForm.form.on || function() {})(['change', 'load'], storeState);
      (clientForm.form.on || function() {})('created', function (result) {
        // [BA-404] The welcome email is a link to set a password, which
        // "Single sign-on only" clients don't have.
        var sendWelcome = clientForm.input.sendEmail.welcome && !clientForm.input.auth.sso_only;

        return sendWelcome && Api.all('client/'+result.id+'/email').post({
          type: 'client-account-created',
        });
      });

      if (!(clientForm.form.input || {}).id) {
        loadDefaults();
      }
    }

    /**
     * [BA-404] A new client starts with the defaults from System > Settings
     * > Site. Left alone when they can't be read: the API applies them to
     * whatever the form doesn't send.
     */
    function loadDefaults() {
      Api.all('setting-group').getList().then(function (groups) {
        _.each(groups, function (group) {
          _.each(group.settings, function (setting) {
            if (setting.slug === DEFAULT_SSO_ONLY && clientForm.input.auth.sso_only === undefined) {
              clientForm.input.auth.sso_only = isOn(setting.value);
            }

            if (setting.slug === DEFAULT_SUB_CLIENTS_DISABLED && clientForm.input.sub_clients.disabled === undefined) {
              clientForm.input.sub_clients.disabled = isOn(setting.value);
            }
          });
        });
      }, angular.noop);
    }

    function isOn(value) {
      return !!value && value !== '0' && value !== 'false';
    }

    function getData() {
      var data = _.clone(clientForm.input);

      // [BA-404] Only these two: the rest of `auth` is the client's own to change.
      data.auth = {
        sso_only: (clientForm.input.auth || {}).sso_only,
      };
      data.sub_clients = {
        disabled: (clientForm.input.sub_clients || {}).disabled,
      };

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
      clientForm.input.auth = clientForm.input.auth || {};
      clientForm.input.sub_clients = clientForm.input.sub_clients || {};
    }

    function storeState(response) {
      fillFormInputs();
      clientForm.billing.integration.selected = response.integration;
    }
  }
})();
