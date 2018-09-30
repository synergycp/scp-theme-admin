(function () {
  'use strict';

  angular
    .module('app.user')
    .run(SystemNavConfig)
    ;

  var CLIENTS = {
    text: "Clients",
    sref: "app.user.client.list",
  };

  var ADMINS = {
    text: "Administrators",
    sref: "app.user.admin.list",
  };

  /**
   * @ngInject
   */
  function SystemNavConfig(Auth, Nav, Permission) {
    var group = Nav.group('user', {
      translate: "nav.USERS",
      sref: "app.user.client.list",
      icon: "fa fa-user",
    });

    Auth.whileLoggedIn(show, hide);

    function show() {
      Permission
        .map()
        .then(showPermitted)
      ;
    }

    function showPermitted(map) {
      if (map.users.clients.read) {
        group.item(CLIENTS);
      }

      if (map.users.admins.read) {
        group.item(ADMINS);
      }
    }

    function hide() {
      group.remove(CLIENTS);
      group.remove(ADMINS);
    }
  }
})();
