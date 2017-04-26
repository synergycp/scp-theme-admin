(function () {
  'use strict';

  angular
    .module('app.network.switch.details')
    .component('switchDetails', {
      require: {
      },
      bindings: {
        switch: '=',
      },
      controller: 'SwitchDetailsCtrl as details',
      transclude: true,
      templateUrl: 'app/network/switch/details/details.html'
    })
    .controller('SwitchDetailsCtrl', SwitchDetailsCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchDetailsCtrl() {
    var details = this;

    details.$onInit = init;

    //////////

    function init() {
    }
  }
})();
