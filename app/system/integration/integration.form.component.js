(function () {
  'use strict';

  var INPUTS = {
    name: '',
    subject: '',
    body: '',
    permission_group_id: 1
    
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
  function IntegrationFormCtrl(Api, PermissionLang) {
    var integrationForm = this;

    integrationForm.$onInit = init;
    integrationForm.input = _.clone(INPUTS);
    integrationForm.permission_groups = [];

    //////////

    function init() {
      if (!_.get(integrationForm.form, 'input.id')) {
        // TODO: provide an endpoint that makes this one request instead of two.
        Api.all('admin')
          .getList()
          .then(function () {
            return Api.all("permission-group").getList()
              .then(function (response) {
                _.setContents(integrationForm.permission_groups, response);
                integrationForm.input.permission_group_id = integrationForm.input.permission_group_id ||
                  integrationForm.permission_groups[0].slug;
              });
          });
      }

      integrationForm.form.getData = getData;
      fillFormInputs();

      var listen = integrationForm.form.on || function () {};

      listen(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(integrationForm.input);
    }

    function fillFormInputs() {
      _.overwrite(integrationForm.input, integrationForm.form.input);
    }
  }
})();
