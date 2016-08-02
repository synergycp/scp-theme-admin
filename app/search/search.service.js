(function () {
  'use strict';

  angular
    .module('app.search')
    .service('Search', SearchService)
    ;

  /**
   * Search Service
   *
   * @ngInject
   */
  function SearchService (EventEmitter, $state, $stateParams, $q, $rootScope) {
    var Search = this;
    var event = EventEmitter();

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
      Search.query = toParams.q;
    });

    Search.go = go;
    Search.tab = {
      items: [],
      add: addTab,
      loadAll: loadAllTabs,
    };

    event.bindTo(Search);
    event.on('change', function () {
      $state.go('app.search', {
        q: Search.query,
      });
    });

    //////////

    function go(search) {
      if (typeof search !== 'undefined') {
        Search.query = search;
      }

      event.fire('change', Search.query);
    }

    function addTab(tab) {
      Search.tab.items.push(tab);

      event.fire('tab.add', tab);
    }

    function loadAllTabs() {
      return $q.all(_.map(Search.tab.items, function (tab) {
        return tab.list.filter({
          q: Search.query,
        }).load();
      }));
    }
  }
})();
