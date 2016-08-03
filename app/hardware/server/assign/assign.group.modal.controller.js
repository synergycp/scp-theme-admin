(function () {
  'use strict';

  angular
    .module('app.hardware.server.assign')
    .controller('ServerAssignGroupModalCtrl', ServerAssignGroupModalCtrl)
    ;

  /**
   * ServerAssignGroupModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignGroupModalCtrl(Select, items) {
    var modal = this;

    modal.items = items;
    modal.group = Select('group');
    modal.submit = submit;

    activate();

    //////////

    function activate() {
    }

    function submit() {
      return modal.$close(modal.group.selected);
    }
  }
})();
