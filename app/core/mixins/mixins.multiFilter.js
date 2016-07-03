(function () {
  'use strict';

  angular
    .module('app.core.mixins')
    .filter('multiFilter', multiFilter)
    ;

  /**
   * @ngInject
   */
  function multiFilter(filterFilter, _) {
    return function (items, query, cols) {
      if (!query) {
        return items;
      }

      var terms = query.split(/\s+/);
      var result = _.reduce(terms, function (result, term) {
        return filterFilter(result, makeFilter(term));
      }, items);

      return result;

      function makeFilter(term) {
        if (!cols) {
          return term;
        }

        var filter = {};

        _.each(cols, function (col) {
          filter[col] = term;
        });
      }
    };
  }
})();
