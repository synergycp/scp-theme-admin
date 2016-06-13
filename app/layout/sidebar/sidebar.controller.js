/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.layout.sidebar')
    .controller('SidebarController', SidebarController);

  /**
   * @ngInject
   */
  function SidebarController($rootScope, $state, Sidebar, Utils, _) {
    var sidebar = this;

    sidebar.items = Sidebar.items;

    sidebar.isCollapsed = [];
    sidebar.addCollapse = addCollapse;
    sidebar.toggleCollapse = toggleCollapse;
    sidebar.getMenuItemPropClasses = getMenuItemPropClasses;

    activate();

    ////////////////

    function activate() {
      closeAllBut(-1);
    }

    function getMenuItemPropClasses(item) {
      return (item.options.heading ? 'nav-heading' : '') +
        (isActive(item) ? ' active' : '');
    }


    function addCollapse($index, item) {
      sidebar.isCollapsed[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    }


    function toggleCollapse($index, isParentItem) {

      // collapsed sidebar doesn't toggle drodopwn
      if (Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover) {
        return true;
      }

      // make sure the item index exists
      if (angular.isDefined(sidebar.isCollapsed[$index])) {
        if (!sidebar.lastEventFromChild) {
          sidebar.isCollapsed[$index] = !sidebar.isCollapsed[$index];
          closeAllBut($index);
        }
      } else if (isParentItem) {
        closeAllBut(-1);
      }

      sidebar.lastEventFromChild = isChild($index);

      return true;

    }

    // Check item and children active state
    function isActive(item) {
      if (!item) {
        return;
      }

      if (!item.options.sref || item.options.sref === '#') {
        return _.some(item.submenu, isActive);
      }

      return $state.is(item.options.sref) || $state.includes(item.options.sref);
    }

    function closeAllBut(index) {
      index += '';
      for (var i in sidebar.isCollapsed) {
        if (index < 0 || index.indexOf(i) < 0)
          sidebar.isCollapsed[i] = true;
      }
    }

    function isChild($index) {
      /*jshint -W018*/
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }
  }

})();
