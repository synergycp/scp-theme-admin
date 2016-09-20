(function () {
  'use strict';

  angular
    .module('app.pxe.profile.list')
    .component('profileTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showReserved: '=?',
        showIpEntities: '=?',
        showServers: '=?',
        showActions: '=?',
      },
      controller: 'ProfileTableCtrl as table',
      transclude: true,
      templateUrl: 'app/pxe/profile/list/list.table.html'
    })
    .controller('ProfileTableCtrl', ProfileTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ProfileTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showReserved: true,
        showIpEntities: true,
        showServers: true,
        showActions: true,
      });
    }
  }
})();
