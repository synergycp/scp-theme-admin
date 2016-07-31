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
    $stateParams,
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

    function loadPanels() {
      _.setContents(vm.panels.top, [{
        templateUrl: PANELS+'/panel.bandwidth.html',
        context: panelContext,
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
