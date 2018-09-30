(function () {
  'use strict';

  angular
    .module('app.system.log')
    .component('logTarget', {
      require: {
      },
      bindings: {
        log: '=',
      },
      controller: 'LogTargetCtrl as logTarget',
      transclude: true,
      templateUrl: 'app/system/log/log.target.html'
    })
    .controller('LogTargetCtrl', LogTargetCtrl)
    ;

  /**
   * @ngInject
   */
  function LogTargetCtrl(Url, $scope) {
    var logTarget = this;

    logTarget.$onInit = init;
    logTarget.getHref = getHref;

    //////////

    function getHref(target) {
      try {
        return target.href = target.href ||
          Url.get(target.url)
          ;
      } catch (_) {
        return null;
      }
    }

    function init() {
    }
  }
})();
