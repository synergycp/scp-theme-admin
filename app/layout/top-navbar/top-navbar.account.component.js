(function () {
  'use strict';

  angular
    .module('app.layout')
    .component('topNavAccount', {
      require: {
      },
      bindings: {
      },
      controller: 'TopNavAccountCtrl as account',
      transclude: true,
      templateUrl: 'app/layout/top-navbar/top-navbar.account.html'
    })
    .controller('TopNavAccountCtrl', TopNavAccountCtrl)
    ;

  /**
   * @ngInject
   */
  function TopNavAccountCtrl(ApiKey) {
    var account = this;

    account.$onInit = init;
    account.user = ApiKey.owner();

    //////////

    function init() {
    }
  }
})();
