(function () {
  'use strict';


  angular
    .module('app.hardware.server.view.manage')
    .controller('ServerManageCtrl', ServerManageCtrl)
    ;

  /**
   * ServerManage Controller
   *
   * @ngInject
   */
  function ServerManageCtrl(
    Api,
    EventEmitter,
    $stateParams,
    ServerManage,
    $scope,
    $q,
    _
  ) {
    var vm = this;
    var $api;

    vm.server = {
      load: loadServer,
      getAccesses: getServerAccesses,
    };
    EventEmitter().bindTo(vm.server);

    vm.panels = ServerManage.renderedPanels;

    vm.$onInit = activate;

    //////////

    function activate() {
      vm.server.id = $stateParams.id;
      $api = Api.all('server').one(vm.server.id);

      vm.server
        .load()
        .then(loadPanels)
        ;
    }

    function loadServer() {
      return $api
        .get()
        .then(storeServer)
        ;
    }

    function getServerAccesses() {
      if (typeof vm.server.accesses !== "undefined") {
        return $q.when(vm.server.accesses);
      }

      return $api
        .all('access')
        .getList()
        .then(storeAccesses)
        ;
    }

    function storeAccesses(response) {
      vm.server.accesses = vm.server.accesses || [];

      _.setContents(vm.server.accesses, response);

      if (vm.server.accesses[0]) {
        vm.server.access = vm.server.access || {};
        _.assign(vm.server.access, vm.server.accesses[0]);
      } else {
        vm.server.access = null;
      }

      return response;
    }

    function storeServer(response) {
      var defer = $q.defer();

      $scope.$evalAsync(function() {
        _.assign(vm.server, response);
        vm.server.patch = patchServer;

        defer.resolve(vm.server);
      });

      return defer.promise;
    }

    function loadPanels() {
      ServerManage.init(vm.server, $scope);
    }

    function patchServer() {
      return $api.patch
        .apply($api, arguments)
        .then(storeServer)
        .then(fireChangeEvent)
        ;
    }

    function fireChangeEvent(arg) {
      vm.server.fire('change', vm.server);

      return arg;
    }
  }
})();
