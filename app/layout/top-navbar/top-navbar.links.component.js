(function () {
  'use strict';

  angular
    .module('app.layout')
    .component('topNavLinks', {
      require: {
      },
      bindings: {
      },
      controller: 'TopNavLinksCtrl as links',
      templateUrl: 'app/layout/top-navbar/top-navbar.links.html'
    })
    .controller('TopNavLinksCtrl', TopNavLinksCtrl)
    ;

  /**
   * @ngInject
   */
  function TopNavLinksCtrl() {
    var links = this;

    links.$onInit = init;

    //////////

    function init() {
    }
  }
})();
