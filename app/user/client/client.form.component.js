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
  function ClientFormCtrl() {
    var clientForm = this;

    clientForm.$onInit = init;
    clientForm.input = _.clone(INPUTS);

    //////////

    function init() {
      clientForm.form.getData = getData;
      fillFormInputs();

      (clientForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(clientForm.input);
    }

    function fillFormInputs() {
      _.overwrite(clientForm.input, clientForm.form.input);
    }
  }
})();
