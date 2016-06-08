(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('LogViewCtrl', LogViewCtrl)
    ;

  /**
   * View Log Controller
   *
   * @ngInject
   */
  function LogViewCtrl(Api, $stateParams, _) {
    var vm = this;
    var $api = Api.one('log/'+$stateParams.id);

    vm.log = {};

    activate();

    //////////

    function activate() {
      $api.get().then(saveLog);
    }

    function saveLog(data) {
      _.assign(vm.log, data);
    }
  }
})();
