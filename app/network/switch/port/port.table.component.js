(function () {
  'use strict';

  angular
    .module('app.network.switch.port')
    .component('switchPortTable', {
      require: {
        list: '\^list',
      },
      controller: 'SwitchPortTableCtrl as table',
      transclude: true,
      templateUrl: 'app/network/switch/port/port.table.html'
    })
    .controller('SwitchPortTableCtrl', SwitchPortTableCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchPortTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
    }
  }
})();
