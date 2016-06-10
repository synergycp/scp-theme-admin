(function () {
  'use strict';

  var INPUTS = {
    email: '',
    password: '',
    first: '',
    last: '',
    billing_id: '',
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
      templateUrl: 'app/user/client/client.form.html'
    })
    .controller('ClientFormCtrl', ClientFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ClientFormCtrl() {
    var clientForm = this;

    clientForm.$onInit = init;

    //////////

    function init() {
      clientForm.form.getData = getData;
      clientForm.input = clientForm.form.input = clientForm.form.input || {};
      _.assign(clientForm.input, INPUTS);
    }

    function getData() {
      return _.clone(clientForm.input);
    }
  }
})();
