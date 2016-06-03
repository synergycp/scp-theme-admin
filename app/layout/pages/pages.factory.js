(function () {
  'use strict';

  angular
    .module('app.layout.pages')
    .factory('Pages', PagesFactory);

  /*ngInject*/
  function PagesFactory(EventEmitter) {
    return function () {
      return new Pages(EventEmitter());
    };
  }

  function Pages(event) {
    var pages = this;

    pages.current =
    pages.min =
    pages.max = 1;

    pages.set = setPage;
    pages.setMax = setMax;
    pages.fromMeta = fromMeta;

    event.bindTo(pages);

    ////////////////

    function setPage(page) {
      if (page === pages.current) {
        return;
      }

      pages.current = page;

      pages.fire('change', pages.current);
    }

    function setMax(max) {
      if (max === pages.max) {
        return;
      }

      pages.max = max;

      forcePageInRange();

      pages.fire('change:range', [pages.min, pages.max]);
    }

    function forcePageInRange() {
      setPage(Math.min(
        Math.max(pages.current, pages.min),
        pages.max
      ));
    }

    function fromMeta(meta) {
      pages.setMax(meta.last_page);
      pages.current = meta.current_page;
      pages.per_page = meta.per_page;
      pages.total = parseInt(meta.total);
    }
  }

})();