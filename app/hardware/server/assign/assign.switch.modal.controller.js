(function () {
  'use strict';

  angular
    .module('app.hardware.server.assign')
    .controller('ServerAssignSwitchModalCtrl', ServerAssignSwitchModalCtrl)
    ;

  /**
   * ServerAssignSwitchModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignSwitchModalCtrl(Select, items) {
    var modal = this;

    modal.items = items;
    modal.switch = Select('switch');
    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      return modal.$close(modal.switch.selected);
    }
  }
})();
