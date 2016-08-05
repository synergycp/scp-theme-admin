(function () {
  'use strict';

  angular
    .module('app.network.entity.assign')
    .controller('EntityAssignGroupModalCtrl', EntityAssignGroupModalCtrl)
    ;

  /**
   * EntityAssignGroupModalCtrl Controller
   *
   * @ngInject
   */
  function EntityAssignGroupModalCtrl(Select, items) {
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
