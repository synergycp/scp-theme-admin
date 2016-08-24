(function () {
  'use strict';

  angular
    .module('app.hardware.switch.buttons')
    .component('switchButtons', {
      require: {
      },
      bindings: {
        switch: '=',
        showEdit: '=?',
        showManage: '=?',
      },
      controller: 'SwitchButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/hardware/switch/buttons/buttons.html'
    })
    .controller('SwitchButtonsCtrl', SwitchButtonsCtrl)
    ;

  /**
   * @ngInject
   */
  function SwitchButtonsCtrl(
    SwitchModal,
    Loader,
    $state,
    _
  ) {
    var buttons = this;

    buttons.loader = Loader();

    buttons.delete = confirmDelete;
    buttons.$onInit = init;

    //////////

    function init() {
      _.defaults(buttons, {
        showEdit: true,
        showManage: true,
      });
    }

    function confirmDelete() {
      return buttons.loader.during(
        SwitchModal
          .delete([buttons.switch])
          .then(transferToList)
      );
    }

    function fireChangeEvent(arg) {
      buttons.switch.fire('change', buttons.switch);

      return arg;
    }

    function storeChanges(response) {
      _.assign(buttons.switch, response, {
        one: buttons.switch.one,
        all: buttons.switch.all,
        getRestangularUrl: buttons.switch.getRestangularUrl,
      });
    }

    function transferToList() {
      $state.go('app.hardware.switch.list');
    }
  }
})();
