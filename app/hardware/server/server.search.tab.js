(function () {
  'use strict';

  angular
    .module('app.hardware.server')
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
  function ServerSearchTabFactory (ServerList, RouteHelpers) {
    return function () {
        return new ServerSearchTab(
          ServerList(),
          RouteHelpers
        );
    };
  }

  function ServerSearchTab (list, RouteHelpers) {
    var tab = this;

    tab.list = list;
    tab.text = 'hardware.server.search.TITLE';
    tab.results = {
      url: RouteHelpers.basepath('hardware/server/server.search.tab.html'),
    };

    //////////


  }
})();
