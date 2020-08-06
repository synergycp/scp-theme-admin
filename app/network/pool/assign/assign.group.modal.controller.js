(function () {
  'use strict';

  angular
    .module('app.network.pool.assign')
    .controller('PoolAssignGroupModalCtrl', PoolAssignGroupModalCtrl)
    ;

  /**
   * PoolAssignGroupModalCtrl Controller
   *
   * @ngInject
   */
  function PoolAssignGroupModalCtrl(Select, items) {
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
