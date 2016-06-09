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
        listenTo: '=',
      },
      controller: 'LogCtrl as logs',
      transclude: true,
      templateUrl: 'app/layout/logs/logs.html',
    })
    .controller('LogCtrl', LogCtrl)
    ;

  /**
   * @ngInject
   */
  function LogCtrl(_, Loader, Api, Pages) {
    var logs = this;
    var $api = Api.all('log');

    logs.items = [];

    logs.$onInit = init;
    logs.refresh = _.debounce(refresh, 5);
    logs.loader = Loader();
    logs.pages = Pages();

    //////////

    function init() {
      logs.filter = logs.filter || {};
      logs.refresh();
      logs.pages.on('change', logs.refresh);

      if (logs.listenTo) {
        logs.listenTo.on('change', logs.refresh);
      }
    }

    function refresh() {
      return logs.loader.during(
        getItems().then(storeItems)
      );
    }

    function storeItems(response) {
      // Clear and refill log list.
      logs.items.length = 0;
      _(response).forEach(function(item) {
        logs.items.push(item);
      });

      // Update pagination accordingly.
      logs.pages.fromMeta(response.meta);
    }

    function getItems() {
      var query = getQuery();

      return $api.getList(query);
    }

    function getQuery() {
      return _.assign({}, logs.filter, {
        page: logs.pages.current,
      });
    }
  }
})();
