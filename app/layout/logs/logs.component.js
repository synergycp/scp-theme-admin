(function () {
  'use strict';

  angular
    .module('app.layout.logs')
    .component('logs', {
      require: {
      },
      bindings: {
        title: '@',
        filter: '=',
      },
      controller: 'LogListCtrl as logs',
      transclude: true,
      templateUrl: 'app/layout/logs/logs.html'
    })
    .controller('LogListCtrl', LogListCtrl)
    ;

  /**
   * @ngInject
   */
  function LogListCtrl(Loader, Api, Pages) {
    var logs = this;
    var $api = Api.all('log');

    logs.items = [];
    logs.filter = logs.filter || {};

    logs.$onInit = init;
    logs.refresh = refresh;
    logs.loader = Loader();
    logs.pages = Pages();

    //////////

    function init() {
      logs.refresh();
    }

    function refresh() {
      return logs.loader.during(
        getItems().then(storeItems)
      );
    }

    function storeItems(response) {
      logs.items.length = 0;
      _(response).forEach(function(item) {
        item.checked = false;
        logs.items.push(item);
      });

      logs.pages.fromMeta(response.meta);
    }

    function getItems() {
      return $api.getList(logs.filter);
    }
  }
})();
