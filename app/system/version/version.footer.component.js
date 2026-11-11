(function () {
  'use strict';

  angular
    .module('app.system.version')
    .component('systemVersionFooter', {
      controller: 'SystemVersionFooterCtrl',
      templateUrl: 'app/system/version/version.footer.html'
    })
    .controller('SystemVersionFooterCtrl', SystemVersionFooterCtrl);

  /**
   * @ngInject
   */
  function SystemVersionFooterCtrl(Api, Auth) {
    var footer = this;

    footer.$onInit = init;

    //////////

    function init() {
      // The footer shell also renders on the login page, where the request
      // would 401 and the global interceptor would fire Auth.logout().
      if (!Auth.isLoggedIn()) return;

      // latest=0: current only, no remote fetch (air-gapped installs).
      // The footer is cosmetic: never alert, just render nothing on failure.
      Api.one('version')
        .withoutAlertingOnErrors()
        .get({latest: 0})
        .then(function (response) {
          footer.current = response.current;
        })
        .catch(angular.noop);
    }
  }
})();
