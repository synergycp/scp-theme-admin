(function () {
  'use strict';

  angular
    .module('app.network.entity.search')
    .factory('EntitySearchTab', EntitySearchTabFactory)
    .run(addEntitySearchTab)
    ;

  /**
   * Add the EntitySearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addEntitySearchTab(Search, EntitySearchTab, Auth, Permission) {
    Auth.whileLoggedIn(checkPerms);

    function checkPerms() {
      Permission
        .ifHas("network.entities.read")
        .then(addTab);
    }

    function addTab() {
      Search.tab.add(EntitySearchTab());
    }
  }

  /**
   * EntitySearchTab Factory
   *
   * @ngInject
   */
  function EntitySearchTabFactory (
    $state,
    EntityList,
    ListFilter,
    RouteHelpers
  ) {
    return function () {
        var list = EntityList();
        return new EntitySearchTab(
          list,
          $state,
          ListFilter(list),
          RouteHelpers
        );
    };
  }

  function EntitySearchTab (list, $state, filter, RouteHelpers) {
    var tab = this;

    tab.name = 'entities';
    tab.lang = 'entity';
    tab.text = 'entity.search.TITLE';
    tab.order = 15;
    tab.list = list;
    tab.filter = filter;
    tab.getState = getState;
    tab.getStateParams = getStateParams;
    tab.results = {
      url: RouteHelpers.basepath('network/entity/search/search.tab.html'),
    };
    tab.typeaheadTemplateUrl = RouteHelpers.basepath(
      'network/entity/search/search.item.html'
    );

    //////////

    function getState() {
      return 'app.network.entity.view';
    }

    function getStateParams($item) {
      return {
        id: $item.id,
      };
    }

  }
})();
