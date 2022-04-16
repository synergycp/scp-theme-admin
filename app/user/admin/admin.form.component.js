(function () {
  'use strict';

  var INPUTS = {
    username: '',
    password: '',
    email: '',
    receive_copies: '',
    permission_group_id: 1
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
  function AdminFormCtrl(Api) {
    var adminForm = this;

    adminForm.$onInit = init;
    adminForm.input = _.clone(INPUTS);
    adminForm.permission_groups = [];

    //////////

    function init() {
      if (!_.get(adminForm.form, 'input.id')) {
        // TODO: provide an endpoint that makes this one request instead of two.
        Api.all('admin')
          .getList()
          .then(function () {
            return Api.all("permission-group")
              .getList()
              .then(function (response) {
                _.setContents(adminForm.permission_groups, response);
                adminForm.input.permission_group_id = adminForm.input.permission_group_id ||
                  adminForm.permission_groups[0].slug;
              });
          });
      }

      adminForm.form.getData = getData;
      fillFormInputs();

      var listen = adminForm.form.on || function () {};

      listen(['change', 'load'], fillFormInputs);
    }

    function getData() {
      return _.clone(adminForm.input);
    }

    function fillFormInputs() {
      _.overwrite(adminForm.input, adminForm.form.input);
    }
  }
})();
