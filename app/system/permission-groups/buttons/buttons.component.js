(function () {
  'use strict';

  angular
    .module('app.system.permission-groups.buttons')
    .component('permissionGroupsButtons', {
      require: {
      },
      bindings: {
        permissionGroup: '=',
      },
      controller: 'PermissionGroupsButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/system/permission-groups/buttons/buttons.html'
    })
    ;
})();
