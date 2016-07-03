(function () {
  'use strict';

  var PANELS = 'app/hardware/server/manage/panel';

  angular
    .module('app.hardware.server.manage')
    .controller('ServerManageCtrl', ServerManageCtrl)
    ;

  /**
   * ServerManage Controller
   *
   * @ngInject
   */
  function ServerManageCtrl(Api, EventEmitter, $stateParams, $scope, $q, _) {
    var vm = this;
    var $api = Api.all('server').one($stateParams.id);
    var panelContext = {};

    vm.server = {
      id: $stateParams.id,
      load: loadServer,
    };
    EventEmitter().bindTo(vm.server);
    panelContext.server = vm.server;

    vm.panels = {
      top: [],
      left: [],
      right: [],
    };

    activate();

    //////////

    function activate() {
      // TODO: load panels while vm.server is loading
      // (causes issue with vm.server properties missing)
      vm.server.load()
        .then(loadPanels);
    }

    function loadServer() {
      return $api.get()
        .then(storeServer)
        ;
    }

    function storeServer(response) {
      var defer = $q.defer();

      $scope.$evalAsync(function() {
        // TODO: fix this shit
        _.assign(vm.server, response);
        vm.server.get = $api.get;
        vm.server.all = $api.all;
        vm.server.one = $api.one;
        vm.server.patch = patchServer;
        vm.server.remove = $api.remove;
        defer.resolve(vm.server);
      });

      return defer.promise;
    }

    function loadPanels() {
      _.setContents(vm.panels.top, [{
        templateUrl: PANELS+'/panel.bandwidth.html',
      }]);

      _.setContents(vm.panels.left, [{
        templateUrl: PANELS+'/panel.hardware.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.assign.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.notes.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.logs.html',
        context: {
          server: vm.server,
          filter: {
            target_type: 'server',
            target_id: vm.server.id,
          },
        },
      },]);

      _.setContents(vm.panels.right, [{
        templateUrl: PANELS+'/panel.control.switch.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.control.ipmi.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.os-reload.html',
        context: panelContext,
      },]);
    }

    function patchServer() {
      return $api.patch.apply($api, arguments)
        .then(vm.server.fire.bind(null, 'change', vm.server))
        ;
    }
  }
})();
