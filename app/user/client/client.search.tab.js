(function () {
  'use strict';

  angular
    .module('app.user.client')
    .factory('ClientSearchTab', ClientSearchTabFactory)
    .run(addClientSearchTab)
    ;

  /**
   * Add the ClientSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addClientSearchTab(Search, ClientSearchTab) {
    Search.tab.add(ClientSearchTab());
  }

  /**
   * ClientSearchTab Factory
   *
   * @ngInject
   */
  function ClientSearchTabFactory (ClientList, ListFilter, RouteHelpers) {
    return function () {
        var list = ClientList();
        return new ClientSearchTab(
          list,
          ListFilter(list),
          RouteHelpers
        );
    };
  }

  function ClientSearchTab (list, filter, RouteHelpers) {
    var tab = this;

    tab.list = list;
    tab.filter = filter;
    tab.text = 'user.client.search.TITLE';
    tab.results = {
      url: RouteHelpers.basepath('user/client/client.search.tab.html'),
    };

    //////////


  }
})();
