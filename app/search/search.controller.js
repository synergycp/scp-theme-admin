(function () {
  'use strict';

  angular
    .module('app.search')
    .controller('SearchCtrl', SearchCtrl)
    ;

  /**
   * Search Controller
   *
   * @ngInject
   */
  function SearchCtrl(Search) {
    var vm = this;
    var debouncedLoad = _.debounce(loadSearch, 300, {
      maxWait: 700,
    });

    vm.search = Search;
    vm.search.on('change', debouncedLoad);
    vm.tab = {
      items: vm.search.tab.items,
      change: changeTab,
    };

    activate();

    //////////

    function activate() {
      debouncedLoad();
    }

    function loadSearch() {
      vm.search.tab.loadAll();
    }

    function changeTab() {
    }
  }
})();
