(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .factory('EntitySearchTab', EntitySearchTabFactory)
    .run(addEntitySearchTab)
    ;

  /**
   * Add the EntitySearchTab to the Search tabs list.
   *
   * @ngInject
   */
  function addEntitySearchTab(Search, EntitySearchTab) {
    Search.tab.add(EntitySearchTab());
  }

  /**
   * EntitySearchTab Factory
   *
   * @ngInject
   */
  function EntitySearchTabFactory (EntityList, ListFilter, RouteHelpers) {
    return function () {
        var list = EntityList();
        return new EntitySearchTab(
          list,
          ListFilter(list),
          RouteHelpers
        );
    };
  }

  function EntitySearchTab (list, filter, RouteHelpers) {
    var tab = this;

    tab.name = 'entities';
    tab.list = list;
    tab.filter = filter;
    tab.text = 'network.entity.search.TITLE';
    tab.results = {
      url: RouteHelpers.basepath('network/entity/entity.search.tab.html'),
    };

    //////////


  }
})();
