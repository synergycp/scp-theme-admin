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
        input: '=',
      },
      controller: 'ShellFormCtrl as shellForm',
      transclude: true,
      templateUrl: 'app/pxe/shell/shell.form.html',
    })
    .controller('ShellFormCtrl', ShellFormCtrl)
    ;

  function ShellFormCtrl() {
    var shellForm = this;

    shellForm.$onInit = init;

    //////////

    function init() {
      _.assign(shellForm.input, INPUTS);
    }
  }
})();
