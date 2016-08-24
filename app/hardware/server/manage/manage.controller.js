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
  function ServerManageCtrl(
    Api,
    EventEmitter,
    BandwidthFilter,
    date,
    moment,
    $stateParams,
    $state,
    $scope,
    $q,
    _
  ) {
    var vm = this;
    var $api = Api.all('server').one($stateParams.id);
    var panelContext = {};

    vm.server = {
      id: $stateParams.id,
      load: loadServer,
      getAccesses: getServerAccesses,
    };
    EventEmitter().bindTo(vm.server);
    panelContext.server = vm.server;

    var bandwidth = _.assign({
      filter: BandwidthFilter(),
    }, panelContext);

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

      $scope.$on('$routeUpdate', syncStateToFilter);
      bandwidth.filter.on('change', syncFilterToState);
    }

    function loadServer() {
      return $api.get()
        .then(storeServer)
        ;
    }

    function getServerAccesses() {
      if (typeof vm.server.accesses !== "undefined") {
        return $q.when(vm.server.accesses);
      }

      return $api.all('access')
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

        defer.resolve(vm.server);
      });

      return defer.promise;
    }

    function loadPanels() {
      syncStateToFilter();

      _.setContents(vm.panels.top, [{
        templateUrl: PANELS+'/panel.bandwidth.html',
        context: bandwidth,
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
      }, {
        templateUrl: PANELS+'/panel.buttons.html',
        context: panelContext,
      },]);
    }

    function syncStateToFilter() {
      if (!$stateParams['bandwidth.start']) {
        return;
      }

      bandwidth.filter.setRange(
        moment($stateParams['bandwidth.start'], date.formatDateTime),
        moment($stateParams['bandwidth.end'], date.formatDateTime)
      );
    }

    function syncFilterToState() {
      var filter = bandwidth.filter;
      $state.go($state.current.name, _.assign($stateParams, {
        'bandwidth.start': filter.start.format(date.formatDateTime),
        'bandwidth.end': filter.end.format(date.formatDateTime),
      }));
    }

    function patchServer() {
      return $api.patch
        .apply($api, arguments)
        .then(fireChangeEvent)
        ;
    }

    function fireChangeEvent(arg) {
      vm.server.fire('change', vm.server);

      return arg;
    }
  }
})();
