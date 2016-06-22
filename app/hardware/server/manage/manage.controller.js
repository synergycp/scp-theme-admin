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
  function ServerManageCtrl(Api, $stateParams, $scope, $q, _) {
    var vm = this;
    var $api = Api.all('server').one($stateParams.id);
    var panelContext = {};

    vm.server = {
      id: $stateParams.id,
      load: loadServer,
      mac: '',
    };
    panelContext.server = vm.server;

    vm.panels = {
      top: [],
      left: [],
      right: [],
    };

    activate();

    //////////

    function activate() {
      vm.server.load();
      loadPanels();
    }

    function loadServer() {
      return $api.get()
        .then(storeServer)
        ;
    }

    function storeServer(server) {
      var defer = $q.defer();

      $scope.$evalAsync(function() {
        _.assign(vm.server, server);
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
      },]);

      _.setContents(vm.panels.right, []);
    }
  }
})();
