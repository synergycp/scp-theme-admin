(function () {
  'use strict';

  angular
    .module('app.layout.pages')
    .controller('PaginationCtrl', PaginationCtrl)
    ;

  /**
   * Pagination Controller
   *
   * @ngInject
   */
  function PaginationCtrl(_) {
    var pagination = this;

    pagination.$onInit = init();

    //////////

    function init() {
      computeVisible();

      pagination.pages.on('change:range', computeVisible);
    }

    function computeVisible() {
      pagination.visible = _.range(
        pagination.pages.min,
        pagination.pages.max+1
      );
    }

  }
})();
