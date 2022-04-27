(function () {
  'use strict';

  angular
    .module('app.user.client.search')
    .factory('ClientSearchTab', ClientSearchTabFactory)
    .run(addClientSearchTab)
    ;

  /**
   * Add the ClientSearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addClientSearchTab(Search, ClientSearchTab, Auth, Permission) {
    Auth.whileLoggedIn(checkPerms);

    function checkPerms() {
      Permission
        .ifHas("users.clients.read")
        .then(addTab);
    }

    function addTab() {
      Search.tab.add(ClientSearchTab());
    }
  }

  /**
   * ClientSearchTab Factory
   *
   * @ngInject
   */
  function ClientSearchTabFactory ($state, ClientList, ListFilter, RouteHelpers) {
    return function () {
        var list = ClientList();
        return new ClientSearchTab(
          list,
          $state,
          ListFilter(list),
          RouteHelpers
        );
    };
  }

  function ClientSearchTab (list, $state, filter, RouteHelpers) {
    var tab = this;

    tab.name = 'clients';
    tab.list = list;
    tab.filter = filter;
    tab.lang = 'client';
    tab.text = 'client.search.TITLE';
    tab.getState = getState;
    tab.getStateParams = getStateParams;
    tab.order = 10;
    tab.results = {
      url: RouteHelpers.basepath('user/client/search/search.tab.html'),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      'user/client/search/search.item.html'
    );

    //////////

    function getState() {
      return 'app.user.client.view';
    }

    function getStateParams($item) {
      return {
        id: $item.id,
      };
    }
  }
})();
