(function () {
  'use strict';

  angular
    .module('app.layout.sidebar')
    .provider('Sidebar', makeSidebarProvider);

  /**
   * @ngInject
   */
  function makeSidebarProvider(_) {
    var items = [];
    var order = [];
    var SidebarProvider = {
      group: getOrCreateGroup,
      order: setOrder,
    };
    var groups = {};

    SidebarProvider.$get = makeSidebarService;

    return SidebarProvider;

    /**
     * @ngInject
     */
    function makeSidebarService() {
      return new SidebarService();
    }

    function SidebarService() {
      var Sidebar = this;

      Sidebar.items = items;
      Sidebar.group = getOrCreateGroup;
    }

    function getOrCreateGroup(id, config) {
      if (groups[id]) {
        return groups[id].config(config);
      }

      var group = groups[id] = new Group(id).config(config);

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

    function Group(id) {
      var group = this;

      group.id = id;
      group.options = {};
      group.submenu = [];

      group.item = item;
      group.config = config;

      function config(opts) {
        if (opts) {
          _.assign(group.options, opts);
        }

        return group;
      }

      function item(opts) {
        group.submenu.push({
          options: opts,
        });

        return group;
      }
    }
  }
})();
