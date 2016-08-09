(function () {
  'use strict';

  var PANELS = 'app/hardware/switch/manage/panel';

  angular
    .module('app.hardware.switch.manage')
    .controller('SwitchManageCtrl', SwitchManageCtrl)
    ;

  /**
   * SwitchManage Controller
   *
   * @ngInject
   */
  function SwitchManageCtrl(
    Api,
    EventEmitter,
    BandwidthFilter,
    date,
    $stateParams,
    $state,
    $scope,
    $q,
    _
  ) {
    var vm = this;
    var $api = Api.all('switch').one($stateParams.id);
    var panelContext = {};

    vm.switch = {
      id: $stateParams.id,
      load: loadSwitch,
    };
    EventEmitter().bindTo(vm.switch);
    panelContext.switch = vm.switch;

    var bandwidth = _.assign({
      tab: {
        active: 0,
        change: onBandwidthTabChange,
      },
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
      // TODO: load panels while vm.switch is loading
      // (causes issue with vm.switch properties missing)
      vm.switch.load()
        .then(loadPanels);

      $scope.$on('$routeUpdate', syncStateToFilter);
      $scope.$on('$routeUpdate', syncStateToTabs);

      syncStateToTabs();
    }

    function loadSwitch() {
      return $api.get()
        .then(storeSwitch)
        ;
    }

    function storeSwitch(response) {
      var defer = $q.defer();

      $scope.$evalAsync(function() {
        // TODO: fix this shit
        _.assign(vm.switch, response, {
          get: $api.get,
          all: $api.all,
          one: $api.one,
          patch: patchSwitch,
          remove: $api.remove,
        });

        defer.resolve(vm.switch);
      });

      return defer.promise;
    }

    function syncStateToTabs() {
      bandwidth.tab.active = $stateParams['bandwidth.tab'] || 0;
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
      $state.go($state.current.name, {
        'bandwidth.start': filter.start.format(date.formatDateTime),
        'bandwidth.end': filter.end.format(date.formatDateTime),
      });
    }

    function onBandwidthTabChange(index) {
      $state.go($state.current.name, {
        'bandwidth.tab': index,
      });
    }

    function loadPanels() {
      syncStateToFilter();

      bandwidth.filter.on('change', syncFilterToState);

      _.setContents(vm.panels.top, [{
        templateUrl: PANELS+'/panel.bandwidth.html',
        context: bandwidth,
      }]);

      _.setContents(vm.panels.left, [{
        templateUrl: PANELS+'/panel.logs.html',
        context: {
          switch: vm.switch,
          filter: {
            target_type: 'switch',
            target_id: vm.switch.id,
          },
        },
      },]);

      _.setContents(vm.panels.right, [{
        templateUrl: PANELS+'/panel.buttons.html',
        context: panelContext,
      },]);
    }

    function patchSwitch() {
      return $api.patch.apply($api, arguments)
        .then(fireChangeEvent)
        ;
    }

    function fireChangeEvent(arg) {
      vm.switch.fire('change', vm.switch);

      return arg;
    }
  }
})();
