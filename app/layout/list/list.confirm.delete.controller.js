(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .controller('ListConfirmDeleteCtrl', ListConfirmDeleteCtrl)
    ;

  /**
   * ListConfirmDelete Controller
   *
   * @ngInject
   */
  function ListConfirmDeleteCtrl(items, lang) {
    var modal = this;

    modal.lang = lang;
    modal.targets = items;
    modal.submit = submit;

    //////////

    function submit() {
      return modal.$close();
    }
  }
})();
