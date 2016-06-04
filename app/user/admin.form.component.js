(function () {
  'use strict';

  var INPUTS = {
    username: '',
    password: '',
    email: '',
    receive_copies: '',
    access_admins: '',
    access_logs: '',
  };

  angular
    .module('app.user')
    .component('adminForm', {
      require: {
      },
      bindings: {
        input: '=',
      },
      controller: 'AdminFormCtrl as adminForm',
      transclude: true,
      templateUrl: 'app/user/admin.form.html'
    })
    .controller('AdminFormCtrl', AdminFormCtrl)
    ;

  function AdminFormCtrl() {
    var adminForm = this;

    adminForm.$onInit = init;

    //////////

    function init() {
      _.assign(adminForm.input, INPUTS);
    }
  }
})();
