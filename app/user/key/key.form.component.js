(function () {
  'use strict';

  var INPUTS = {
    name: '',
    expires_at: null,
  };

  angular
    .module('app.user.key')
    .component('apiKeyForm', {
      require: {
      },
      bindings: {
        form: '=',
        lang: '@',
      },
      controller: 'ApiKeyFormCtrl as apiKeyForm',
      transclude: true,
      templateUrl: 'app/user/key/key.form.html',
    })
    .controller('ApiKeyFormCtrl', ApiKeyFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ApiKeyFormCtrl(_) {
    var apiKeyForm = this;

    apiKeyForm.$onInit = init;
    apiKeyForm.input = _.clone(INPUTS);

    //////////

    function init() {
      apiKeyForm.form.getData = getData;
      fillFormInputs();

      (apiKeyForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(apiKeyForm.input);
    }

    function fillFormInputs() {
      _.overwrite(apiKeyForm.input, apiKeyForm.form.input);
    }
  }
})();
