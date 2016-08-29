(function () {
  'use strict';

  angular
    .module('app.layout.nav')
    .run(propagateNav)
    ;

  function propagateNav(Nav) {
    _.map(Nav.items, function (group) {
      group.syncAlerts();
    });
  }
})();
