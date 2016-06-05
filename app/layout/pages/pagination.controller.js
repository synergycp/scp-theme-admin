(function () {
  'use strict';

  var DEFAULTS = {
    maxVisible: 5
  };

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
      pagination.maxVisible = pagination.maxVisible || DEFAULTS.maxVisible;

      pagination.pages.on('change', computeVisible);
      pagination.pages.on('change:range', computeVisible);

      computeVisible();
    }

    function computeVisible() {
      pagination.visible = _.range(
        startVisibleRange(),
        endVisibleRange()+1
      );
    }

    function startVisibleRange() {
      return Math.max(
        pagination.pages.min,
        Math.min(
          pagination.pages.max - pagination.maxVisible+1,
          Math.round(pagination.pages.current - pagination.maxVisible/2)
        )
      );
    }

    function endVisibleRange() {
      return Math.min(
        pagination.pages.max,
        startVisibleRange()+pagination.maxVisible-1
      );
    }
  }
})();
