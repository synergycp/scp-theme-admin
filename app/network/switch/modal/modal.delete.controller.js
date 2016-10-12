(function () {
  'use strict';

  angular
    .module('app.network.switch.modal')
    .controller('SwitchModalDeleteCtrl', SwitchModalDeleteCtrl)
    ;

  /**
   * SwitchModalDeleteCtrl Controller
   *
   * @ngInject
   */
  function SwitchModalDeleteCtrl(targets) {
    var modal = this;

    modal.targets = targets;

    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      return modal.$close();
    }
  }
})();
