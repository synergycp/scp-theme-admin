(function () {
  'use strict';

  angular
    .module('app.user.client.view')
    .component('clientServers', {
      require: {},
      bindings: {},
      controller: 'ClientServersCtrl as servers',
      transclude: true,
      templateUrl: 'app/user/client/view/view.servers.html'
    })
    .controller('ClientServersCtrl', ClientServersCtrl);

  /**
   * @ngInject
   */
  function ClientServersCtrl(List, ListFilter, $stateParams) {
    var servers = this;

    servers.list = List('server')
      .filter({
        client: $stateParams.id
      });
    servers.filters = ListFilter(servers.list);
    servers.filters.add({
      client: $stateParams.id
    });

    servers.$onInit = init;

    //////////

    function init() {
    }
  }
})();
