(function () {
  'use strict';

  angular
    .module('app.hardware.server.search')
    .factory('ServerSearchTab', ServerSearchTabFactory)
    .run(addServerSearchTab)
    ;

  /**
   * Add the ServerSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addServerSearchTab(Search, ServerSearchTab) {
    Search.tab.add(ServerSearchTab());
  }

  /**
   * ServerSearchTab Factory
   *
   * @ngInject
   */
  function ServerSearchTabFactory($state, ServerList, RouteHelpers, ListFilter) {
    return function () {
        var list = ServerList();
        return new ServerSearchTab(
          list,
          $state,
          ListFilter(list),
          RouteHelpers
        );
    };
  }

  function ServerSearchTab(list, $state, filter, RouteHelpers) {
    var tab = this;

    tab.name = 'servers';
    tab.list = list;
    tab.text = 'server.search.TITLE';
    tab.lang = 'server';
    tab.order = 10;
    tab.filter = filter;
    tab.getState = getState;
    tab.getStateParams = getStateParams;
    tab.results = {
      url: RouteHelpers.basepath('hardware/server/search/search.tab.html'),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      'hardware/server/search/search.item.html'
    );

    //////////

    function getState() {
      return 'app.hardware.server.view.manage';
    }

    function getStateParams($item) {
      return {
        id: $item.id,
      };
    }


  }
})();
