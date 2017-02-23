(function () {
  'use strict';

  angular
    .module('app.permission')
    .component('permissionSection', {
      bindings: {
        prefix: '=',
        map: '=',
        hasColumns: '=?',
      },
      controller: 'PermissionSectionCtrl as section',
      templateUrl: 'app/permission/permission.section.html'
    })
    .controller('PermissionSectionCtrl', PermissionSectionCtrl)
  ;

  /**
   * @ngInject
   * @constructor
   */
  function PermissionSectionCtrl() {
    var section = this;

    section.hasSub = hasSub;

    function hasSub(sub) {
      return typeof sub != 'boolean';
    };
  }
})();
