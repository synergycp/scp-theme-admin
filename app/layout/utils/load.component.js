(function () {
  'use strict';

  angular
    .module('app.layout.utils')
    .component('load', {
      require: {
      },
      bindings: {
        from: '=',
        ctx: '=',
      },
      scope: {},
      controller: 'LoadCtrl as load',
      transclude: true,
      templateUrl: 'app/layout/utils/load.html'
    })
    .controller('LoadCtrl', LoadCtrl)
    ;

  /**
   * @ngInject
   */
  function LoadCtrl(_, $scope) {
    var load = this;

    load.$onInit = init;

    //////////

    function init() {
      _.assign($scope, load.from.context || {});
      _.assign($scope, load.context || {});
    }
  }
})();
