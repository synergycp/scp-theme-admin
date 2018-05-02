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
  function IntegrationFormCtrl(Api, PermissionLang) {
    var integrationForm = this;

    integrationForm.$onInit = init;
    integrationForm.input = _.clone(INPUTS);
    integrationForm.permissions = {};

    //////////

    function init() {
      if (!_.get(integrationForm.form, 'input.id')) {
        // TODO: provide an endpoint that makes this one request instead of two.
        Api.all('admin')
          .getList()
          .then(function (admins) {
            return Api.one('admin/'+admins[0].id+'/permission').get()
          })
          .then(function (response) {
            // TODO: share common code w/ admin.permissions.js
            _.merge(integrationForm.permissions, response.getOriginalData());
            PermissionLang.load(integrationForm.permissions)
          });
      }

      integrationForm.form.getData = getData;
      fillFormInputs();

      var listen = integrationForm.form.on || function () {};

      listen(['change', 'load'], fillFormInputs);
      listen(['created'], savePermissions);
    }

    function getData() {
      return _.clone(integrationForm.input);
    }

    function fillFormInputs() {
      _.overwrite(integrationForm.input, integrationForm.form.input);
    }

    function savePermissions(created) {
      Api.one('integration/'+created.id+'/permission')
        .patch(integrationForm.permissions)
        .then(function () {
          integrationForm.form.fire('created.relations', created);
        });
    }
  }
})();
