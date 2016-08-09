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

    pagination.per = {
      options: [
        10,
        20,
        100,
        500,
        1000,
        5000,
      ],
      value: undefined,
      sync: syncPerPage,
    };
    pagination.$onInit = init;

    //////////

    function syncPerPage() {
      pagination.pages.setPer(pagination.per.value);
    }

    function init() {
      pagination.maxVisible = pagination.maxVisible || DEFAULTS.maxVisible;

      pagination.pages
        .on('load', setPerPage)
        .on(['change', 'change:range'], computeVisible)
        ;

      setPerPage();
      computeVisible();
    }

    function setPerPage() {
      pagination.per.value = pagination.pages.per || pagination.per.options[0];
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
