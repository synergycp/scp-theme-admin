(function () {
  'use strict';

  angular
    .module('app.network.forward.gateway.list')
    .component('forwardGatewayTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showHealth: '=?',
        showVersion: '=?',
        showHostname: '=?',
        showPortLimit: '=?',
        showActions: '=?',
      },
      controller: 'ForwardGatewayTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/forward/gateway/list/list.table.html'
    })
    .controller('ForwardGatewayTableCtrl', ForwardGatewayTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ForwardGatewayTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showHealth: true,
        showVersion: true,
        showHostname: true,
        showPortLimit: true,
        showActions: true,
      });
    }
  }
})();
