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

    //////////

    function init() {
      shellForm.form.getData = getData;
      shellForm.input = shellForm.form.input = shellForm.form.input || {};
      _.assign(shellForm.input, INPUTS);
    }

    function getData() {
      return _.clone(shellForm.input);
    }
  }
})();
