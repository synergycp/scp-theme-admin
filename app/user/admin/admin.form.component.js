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
        form: '=',
      },
      controller: 'AdminFormCtrl as adminForm',
      transclude: true,
      templateUrl: 'app/user/admin/admin.form.html'
    })
    .controller('AdminFormCtrl', AdminFormCtrl)
    ;

  function AdminFormCtrl() {
    var adminForm = this;

    adminForm.$onInit = init;

    //////////

    function init() {
      adminForm.form.getData = getData;
      adminForm.input = adminForm.form.input = adminForm.form.input || {};
      _.assign(adminForm.input, INPUTS);
    }

    function getData() {
      return _.clone(adminForm.input);
    }
  }
})();
