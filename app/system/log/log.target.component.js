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

    function getHref() {
      logTarget.log.target.href =
        logTarget.log.target ?
          logTarget.log.target.href || Url.get(logTarget.log.target.url) :
          null
        ;
    }

    function init() {

    }
  }
})();
