(function () {
  'use strict';

  angular
    .module('app.layout.list')
    .controller('ListFooterCtrl', ListFooterCtrl)
    ;

  /**
   * ListFooter Controller
   *
   * @ngInject
   */
  function ListFooterCtrl() {
    var footer = this;

    footer.$onInit = init;

    //////////

    function init() {
      footer.pages = footer.list.pages;
      footer.bulk = footer.list.bulk;
    }

  }
})();
