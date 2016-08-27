/**=========================================================
 * Module: nav.js
 * Wraps the nav and handles collapsed state
 =========================================================*/

(function () {
  'use strict';

  angular
    .module('app.layout.nav')
    .directive('navbar', nav);

  nav.$inject = ['$rootScope', '$timeout', '$window', 'Utils'];

  function nav($rootScope, $timeout, $window, Utils) {
    var $win = angular.element($window);
    var directive = {
      // bindToController: true,
      controller: 'NavCtrl as nav',
      // controllerAs: 'vm',
      link: link,
      restrict: 'EA',
      template: '<nav class="nav" ng-transclude></nav>',
      transclude: true,
      replace: true,
        // scope: {}
    };
    return directive;


    function link(scope, element, attrs) {
      var floatClass = 'nav-floating ' + attrs.dropdownClass;
      var currentState = $rootScope.$state.current.name;
      var $nav = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter';
      var subNav = $();

      $nav.on(eventName, '.nav > li', function () {
        if (Utils.isNavCollapsed() || $rootScope.app.layout.asideHover) {
          subNav.trigger('mouseleave');
          subNav = toggleMenuItem($(this), $nav);

          // Used to detect click and touch events outside the nav
          navAddBackdrop();
        }
      });

      scope.$on('closeNavMenu', function () {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function () {
        if (!Utils.isMobile())
          asideToggleOff();
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        currentState = toState.name;
        // Hide nav automatically on mobile
        asideToggleOff();

        $rootScope.$broadcast('closeNavMenu');
      });

      // Autoclose when click outside the nav
      if (angular.isDefined(attrs.navAnyclickClose)) {
        var wrapper = $('.wrapper');
        var sbclickEvent = 'click.nav';

        $rootScope.$watch('app.asideToggled', watchExternalClicks);
      }

      //////

      function watchExternalClicks(newVal) {
        // if nav becomes visible
        if (newVal === true) {
          $timeout(function () { // render after current digest cycle
            wrapper.on(sbclickEvent, function (e) {
              // if not child of nav
              if (!$(e.target).parents('.aside').length) {
                asideToggleOff();
              }
            });
          });
        } else {
          // dettach event
          wrapper.off(sbclickEvent);
        }
      }

      function asideToggleOff() {
        $rootScope.app.asideToggled = false;
        if (!scope.$$phase) scope.$apply(); // anti-pattern but sometimes necessary
      }



      // Handles hover to open items under collapsed menu
      // -----------------------------------
      function toggleMenuItem($listItem, $nav) {

        removeFloatingNav();

        var ul = $listItem.children('ul');

        if (!ul.length) return $();
        if ($listItem.hasClass('open')) {
          toggleTouchItem($listItem);
          return $();
        }

        var $aside = $('.aside');
        var $asideInner = $('.aside-inner'); // for top offset calculation
        // float aside uses extra padding on aside
        var mar = parseInt($asideInner.css('padding-top'), 0) +
                  parseInt($aside.css('padding-top'), 0);
        var subNav = ul.clone().appendTo($aside);
        var $position = $listItem.position();

        toggleTouchItem($listItem);

        var itemTop = $position.top + mar - $nav.scrollTop();
        var vwHeight = $win.height();
        var css = {
          position: $rootScope.app.layout.isFixed ? 'fixed' : 'absolute',
          top: itemTop,
          left: 'auto',
          bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto',
        };

        if (ul.hasClass('opens-left')) {
          css.right = $win.width() - $position.left - $listItem.outerWidth();
        } else {
          css.left = $position.left;
        }

        subNav
          .addClass(floatClass)
          .css(css);

        subNav.on('mouseleave', function () {
          toggleTouchItem($listItem);
          subNav.remove();
        });

        return subNav;
      }
    }

    ///////

    function navAddBackdrop() {
      var $backdrop = $('<div/>', {
        'class': 'dropdown-backdrop'
      });
      $backdrop.insertAfter('.aside-inner').on('click mouseenter', function () {
        removeFloatingNav();
      });
    }

    // Open the collapse nav submenu items when on touch devices
    // - desktop only opens on hover
    function toggleTouchItem($element) {
      $element
        .siblings('li')
        .removeClass('open')
        .end()
        .toggleClass('open');
    }

    function removeFloatingNav() {
      $('.dropdown-backdrop').remove();
      $('.nav-subnav.nav-floating').remove();
      $('.nav li.open').removeClass('open');
    }
  }


})();
