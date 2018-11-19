(function () {
  'use strict';

  angular
    .module('app.user.admin.buttons')
    .component('adminButtons', {
      require: {
      },
      bindings: {
        admin: '=',
      },
      controller: 'AdminButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/user/admin/buttons/buttons.html'
    })
    ;
})();
