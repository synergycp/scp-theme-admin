(function () {
  'use strict';

  angular
    .module('app.network.pool.search')
    .factory('PoolSearchTab', PoolSearchTabFactory)
    .run(addPoolSearchTab)
    ;

  /**
   * Add the PoolSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addPoolSearchTab(Search, PoolSearchTab) {
    Search.tab.add(PoolSearchTab());
  }

  /**
   * PoolSearchTab Factory
   *
   * @ngInject
   */
  function PoolSearchTabFactory (
    $state,
    PoolList,
    ListFilter,
    RouteHelpers
  ) {
    return function () {
        var list = PoolList();
        return new PoolSearchTab(
          list,
          $state,
          ListFilter(list),
          RouteHelpers
        );
    };
  }

  function PoolSearchTab (list, $state, filter, RouteHelpers) {
    var tab = this;

    tab.name = 'pools';
    tab.lang = 'pool';
    tab.text = 'pool.search.TITLE';
    tab.order = 15;
    tab.list = list;
    tab.filter = filter;
    tab.getState = getState;
    tab.getStateParams = getStateParams;
    tab.results = {
      url: RouteHelpers.basepath('network/pool/search/search.tab.html'),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      'network/pool/search/search.item.html'
    );

    //////////

    function getState() {
      return 'app.network.pool.view';
    }

    function getStateParams($item) {
      return {
        id: $item.id,
      };
    }

  }
})();
