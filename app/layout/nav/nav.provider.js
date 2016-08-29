(function () {
  'use strict';

  angular
    .module('app.layout.nav')
    .provider('Nav', makeNavProvider)
    ;

  /**
   * @ngInject
   */
  function makeNavProvider(_) {
    var items = [];
    var order = [];
    var NavProvider = {
      group: getOrCreateGroup,
      order: setOrder,
    };
    var groups = {};

    NavProvider.$get = makeNavService;

    return NavProvider;

    /**
     * @ngInject
     */
    function makeNavService($rootScope) {
      return new NavService($rootScope);
    }

    function NavService($rootScope) {
      var Nav = this;

      Nav.items = items;
      Nav.group = getOrCreateGroup;
    }

    function getOrCreateGroup(id, config) {
      if (groups[id]) {
        return groups[id].config(config);
      }

      var group = groups[id] = new Group(id, _).config(config);

      items.push(group);
      reorder();

      return group;
    }

    function setOrder(groupNames) {
      _.setContents(order, groupNames);

      reorder();
    }

    function reorder() {
      var orderMap = {};
      _.each(order, function (groupId, key) {
        // Starting indeces at 1 allows us to assume there are
        // no 0's in the order map, which makes the logic below easier.
        orderMap[groupId] = key + 1;
      });

      _.setContents(
        items,
        _.orderBy(items, function (group) {
          return orderMap[group.id] || order.length;
        })
      );
    }

    function Group(id, _) {
      var group = this;

      group.id = id;
      group.options = {};
      group.alerts = [];
      group.submenu = [];

      group.item = item;
      group.config = config;
      group.alert = alert;
      group.syncAlerts = syncAlerts;

      function syncAlerts() {
        _(group.submenu)
          .map(getSubMenuAlert)
          .filter('type')
          .groupBy('type')
          .map(setMainMenuAlert)
          .value();

        return group;

        function getSubMenuAlert(submenu) {
          if (!submenu.options.propagateAlerts) {
            return;
          }

          return {
            type: submenu.options.alertType,
            value: parseInt(submenu.options.alert),
          };
        }

        function setMainMenuAlert(results, type) {
          group
            .alert(type)
            .setCount(_.sumBy(results, 'value'))
            ;
        }
      }

      function alert(type) {
        var alert = _.first(group.alerts, ['type', type]);

        if (!alert) {
          group.alerts.push(
            alert = new GroupAlert(type)
          );
        }

        return alert;
      }

      function config(opts) {
        if (opts) {
          _.assign(group.options, opts);
        }

        return group;
      }

      function item(opts) {
        opts.group = group;
        group.submenu.push({
          options: opts,
        });

        return group;
      }
    }

    function GroupAlert(type) {
      var alert = this;

      alert.type = type || 'success';
      alert.count = 0;
      alert.class = '';

      alert.notifyChange = notifyChange;
      alert.setCount = setCount;

      function setCount(count) {
        if (alert.count == count) {
          return alert;
        }

        alert.count = count;
        alert.notifyChange();

        return alert;
      }

      function notifyChange() {
        alert.class = 'jiggle';
      }
    }
  }
})();
