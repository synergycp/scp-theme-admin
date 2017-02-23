(function () {
  'use strict';

  angular
    .module('app.permission')
    .component('permissions', {
      bindings: {
        map: '='
      },
      controller: 'PermissionsCtrl as perms',
      templateUrl: 'app/permission/permissions.html'
    })
    .controller('PermissionsCtrl', PermissionsCtrl)
  ;

  /**
   * @ngInject
   * @constructor
   */
  function PermissionsCtrl() {
    var perms = this;
  }
})();
