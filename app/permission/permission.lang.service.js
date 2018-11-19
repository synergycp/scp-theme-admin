(function () {
  'use strict';

  angular
    .module('app.user.admin')
    .service('PermissionLang', PermissionLangService)
  ;

  /**
   * @ngInject
   */
  function PermissionLangService(RouteHelpers, $q) {
    var PermissionLang = this;

    PermissionLang.load = load;

    function load(map) {
      var promises = [
        RouteHelpers.loadLang('permissions'),
      ];

      for (var i in map.pkg) {
        promises.push(
          RouteHelpers.loadLang('pkg:'+i+':admin:permissions')
        );
      }

      return $q.all(promises);
    }
  }
})();
