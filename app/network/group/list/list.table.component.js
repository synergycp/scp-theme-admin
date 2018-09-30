(function () {
  'use strict';

  angular
    .module('app.network.group.list')
    .component('groupTable', {
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
      controller: 'GroupTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/group/list/list.table.html'
    })
    .controller('GroupTableCtrl', GroupTableCtrl)
    ;

  /**
   * @ngInject
   */
  function GroupTableCtrl() {
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
