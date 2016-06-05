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
        input: '=',
      },
      controller: 'ClientFormCtrl as clientForm',
      transclude: true,
      templateUrl: 'app/user/client/client.form.html'
    })
    .controller('ClientFormCtrl', ClientFormCtrl)
    ;

  function ClientFormCtrl() {
    var clientForm = this;

    clientForm.$onInit = init;

    //////////

    function init() {
      _.assign(clientForm.input, INPUTS);
    }
  }
})();
