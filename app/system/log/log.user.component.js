(function () {
  'use strict';

  angular
    .module('app.system')
    .component('logUser', {
      require: {
      },
      bindings: {
        log: '=',
      },
      controller: 'LogUserCtrl as logUser',
      transclude: true,
      templateUrl: 'app/system/log/log.user.html'
    })
    .controller('LogUserCtrl', LogUserCtrl)
    ;

  /**
   * @ngInject
   */
  function LogUserCtrl() {
    var logUser = this;

    logUser.$onInit = init;

    //////////

    function init() {
    }
  }
})();
