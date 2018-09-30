(function () {
  'use strict';

  var PANELS = 'app/network/switch/view/manage/panel';
  var TAB = {
    DEFAULT: 0,
  };

  angular
    .module('app.network.switch.view.manage')
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
        active: TAB.DEFAULT,
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
      vm.switch
        .load()
        .then(loadPanels)
        ;

      $scope.$on('$routeUpdate', syncStateToFilter);
      $scope.$on('$routeUpdate', syncStateToTabs);

      syncStateToTabs();
    }

    function loadSwitch() {
      return $api
        .get()
        .then(storeSwitch)
        ;
    }

    function storeSwitch(response) {
      var defer = $q.defer();

      $scope.$evalAsync(function() {
        _.assign(vm.switch, response);

        defer.resolve(vm.switch);
      });

      return defer.promise;
    }

    function syncStateToTabs() {
      bandwidth.tab.active = $stateParams['bandwidth.tab'] || TAB.DEFAULT;
    }

    function syncStateToFilter() {
      if ($stateParams['bandwidth.start']) {
        bandwidth.filter.setRange(
          moment.utc(
            $state.params['bandwidth.start'],
            date.formatDateTime
          ).local(),
          moment.utc(
            $state.params['bandwidth.end'],
            date.formatDateTime
          ).local()
        );
      }
    }

    function syncFilterToState() {
      var filter = bandwidth.filter;
      $state.go($state.current.name, {
        'bandwidth.start': filter.start.utc().format(date.formatDateTime),
        'bandwidth.end': filter.end.utc().format(date.formatDateTime),
      }, {location: 'replace'});
    }

    function onBandwidthTabChange(index) {
      $state.go($state.current.name, {
        'bandwidth.tab': index,
      }, {location: 'replace'});
    }

    function loadPanels() {
      syncStateToFilter();

      bandwidth.filter.on('change', syncFilterToState);

      _.setContents(vm.panels.top, [{
        templateUrl: PANELS+'/panel.bandwidth.html',
        context: bandwidth,
      }]);

      _.setContents(vm.panels.left, [{
        templateUrl: PANELS+'/panel.details.html',
        context: panelContext,
      },{
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
        templateUrl: PANELS+'/panel.scans.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.ports.html',
        context: panelContext,
      }, {
        templateUrl: PANELS+'/panel.buttons.html',
        context: panelContext,
      }]);
    }

    function fireChangeEvent(arg) {
      vm.switch.fire('change', vm.switch);

      return arg;
    }
  }
})();
