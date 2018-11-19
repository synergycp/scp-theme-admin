(function () {
  'use strict';

  var INPUTS = {
    name: '',
    description: '',
    body: '',
  };

  angular
    .module('app.pxe')
    .component('shellForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'ShellFormCtrl as shellForm',
      transclude: true,
      templateUrl: 'app/pxe/shell/shell.form.html',
    })
    .controller('ShellFormCtrl', ShellFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ShellFormCtrl() {
    var shellForm = this;

    shellForm.$onInit = init;
    shellForm.input = _.clone(INPUTS);

    //////////

    function init() {
      shellForm.form.getData = getData;
      fillFormInputs();

      (shellForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(shellForm.input);
    }

    function fillFormInputs() {
      _.overwrite(shellForm.input, shellForm.form.input);
    }
  }
})();
