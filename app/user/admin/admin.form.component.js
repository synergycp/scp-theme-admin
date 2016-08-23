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
      templateUrl: 'app/user/admin/admin.form.html',
    })
    .controller('AdminFormCtrl', AdminFormCtrl)
    ;

  /**
   * @ngInject
   */
  function AdminFormCtrl() {
    var adminForm = this;

    adminForm.$onInit = init;
    adminForm.input = _.clone(INPUTS);

    //////////

    function init() {
      adminForm.form.getData = getData;
      fillFormInputs();

      (adminForm.form.on || function() {})(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(adminForm.input);
    }

    function fillFormInputs() {
      _.overwrite(adminForm.input, adminForm.form.input);
    }
  }
})();
