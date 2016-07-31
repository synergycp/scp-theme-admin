(function () {
  'use strict';

  var API = {
    LIST: 'server/{serverId}/install',
  };

  angular
    .module('app.pxe.install')
    .factory('InstallList', InstallListFactory);

  /**
   * InstallList Factory
   *
   * @ngInject
   */
  function InstallListFactory (List) {
    return function (serverId) {
        serverId = serverId || '*';

        return new InstallList(
          List(API.LIST.replace('{serverId}', serverId))
        );
    };
  }

  function InstallList (list) {
    var installs = this;

    installs.limitScope = limitScope;

    activate();

    //////////

    function activate() {
      list.refresh
        .now()
        .every(10000)
        ;
    }

    function limitScope($scope) {
      list.refresh.limitScope($scope);

      return list;
    }
  }
})();
