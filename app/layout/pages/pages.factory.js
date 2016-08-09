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
    pages.setPer = setPer;

    event.bindTo(pages);

    ////////////////

    function setPer(perPage) {
      pages.per = perPage;

      pages.set(pages.min);
      pages.fire('change:per', pages.per);
    }

    /**
     * @return {bool} Whether or not a change occurred.
     */
    function setPage(page) {
      if (page === pages.current) {
        return false;
      }

      pages.current = page;

      if (forcePageInRange()) {
        return true;
      }

      pages.fire('change', pages.current);

      return true;
    }

    function setMax(max) {
      if (max === pages.max) {
        return;
      }

      pages.max = max;

      forcePageInRange();

      pages.fire('change:range', [pages.min, pages.max]);
    }

    /**
     * @return {bool} Whether or not a change occurred.
     */
    function forcePageInRange() {
      return setPage(Math.min(
        Math.max(pages.current, pages.min),
        pages.max
      ));
    }

    function fromMeta(meta) {
      pages.setMax(meta.last_page);
      pages.current = meta.current_page;
      pages.per = meta.per_page;
      pages.total = parseInt(meta.total);
      pages.fire('load');
    }
  }

})();
