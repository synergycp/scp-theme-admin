/**=========================================================
 * Module: nav-menu.js
 * Handle nav collapsible elements
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.layout.nav')
    .controller('NavCtrl', NavCtrl);

  /**
   * @ngInject
   */
  function NavCtrl($rootScope, $state, Nav, Utils, _) {
    var nav = this;

    nav.items = Nav.items;

    nav.isCollapsed = [];
    nav.addCollapse = addCollapse;
    nav.toggleCollapse = toggleCollapse;
    nav.getMenuItemPropClasses = getMenuItemPropClasses;

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
      nav.isCollapsed[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    }


    function toggleCollapse($index, isParentItem) {
      // collapsed nav doesn't toggle drodopwn
      if (Utils.isNavCollapsed() || $rootScope.app.layout.asideHover) {
        return true;
      }

      // make sure the item index exists
      if (angular.isDefined(nav.isCollapsed[$index])) {
        if (!nav.lastEventFromChild) {
          nav.isCollapsed[$index] = !nav.isCollapsed[$index];
          closeAllBut($index);
        }
      } else if (isParentItem) {
        closeAllBut(-1);
      }

      nav.lastEventFromChild = isChild($index);

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
      for (var i in nav.isCollapsed) {
        if (index < 0 || index.indexOf(i) < 0)
          nav.isCollapsed[i] = true;
      }
    }

    function isChild($index) {
      /*jshint -W018*/
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }
  }

})();
