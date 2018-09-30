(function () {
  'use strict';

  angular
    .module('app.network.switch.speed')
    .component('speedButtons', {
      require: {},
      bindings: {
        speed: '=',
      },
      controller: 'SpeedButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/network/switch/speed/speed.view.buttons.html'
    })
    .controller('SpeedButtonsCtrl', SpeedButtonsCtrl);

  /**
   * @ngInject
   */
  function SpeedButtonsCtrl(SwitchSpeedList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        SwitchSpeedList()
          .confirm
          .delete([buttons.speed])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.network.switch.speed.list');
    }
  }
})();
