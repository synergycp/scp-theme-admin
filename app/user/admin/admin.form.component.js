(function () {
  'use strict';

  var INPUTS = {
    username: '',
    password: '',
    email: '',
    receive_copies: '',
  };

  angular
    .module('app.user.admin')
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
  function AdminFormCtrl(Api, PermissionLang) {
    var adminForm = this;

    adminForm.$onInit = init;
    adminForm.input = _.clone(INPUTS);
    adminForm.permissions = {};

    //////////

    function init() {
      if (!_.get(adminForm.form, 'input.id')) {
        // TODO: provide an endpoint that makes this one request instead of two.
        Api.all('admin')
          .getList()
          .then(function (admins) {
            return Api.one('admin/'+admins[0].id+'/permission').get()
          })
          .then(function (response) {
            // TODO: share common code w/ admin.permissions.js
            _.merge(adminForm.permissions, response.getOriginalData());
            PermissionLang.load(adminForm.permissions)
          });
      }

      adminForm.form.getData = getData;
      fillFormInputs();

      var listen = adminForm.form.on || function () {};

      listen(['change', 'load'], fillFormInputs);
      listen(['created'], savePermissions);
    }

    function savePermissions(created) {
      Api.one('admin/'+created.id+'/permission').patch(adminForm.permissions);
    }

    function getData() {
      return _.clone(adminForm.input);
    }

    function fillFormInputs() {
      _.overwrite(adminForm.input, adminForm.form.input);
    }
  }
})();
