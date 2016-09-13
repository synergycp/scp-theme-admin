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
  function ServerSearchTabFactory ($state, ServerList, RouteHelpers) {
    return function () {
        return new ServerSearchTab(
          ServerList(),
          $state,
          RouteHelpers
        );
    };
  }

  function ServerSearchTab (list, $state, RouteHelpers) {
    var tab = this;

    tab.name = 'servers';
    tab.list = list;
    tab.text = 'server.search.TITLE';
    tab.lang = 'server';
    tab.select = onSelect;
    tab.results = {
      url: RouteHelpers.basepath('hardware/server/search/search.tab.html'),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      'hardware/server/search/search.item.html'
    );

    //////////

    function onSelect($item) {
      $state.go('app.hardware.server.view.manage', {
        id: $item.id,
      });
    }


  }
})();
