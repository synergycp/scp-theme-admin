(function () {
  'use strict';

  angular
    .module('app.user.key.list')
    .component('apiKeyTable', {
      require: {
        list: '\^list',
      },
      bindings: {
        showName: '=?',
        showKey: '=?',
        showActions: '=?',
        viewState: '&',
      },
      controller: 'ApiKeyTableCtrl as table',
      transclude: true,
      templateUrl: 'app/user/key/list/list.table.html',
    })
    .controller('ApiKeyTableCtrl', ApiKeyTableCtrl)
    ;

  /**
   * @ngInject
   */
  function ApiKeyTableCtrl() {
    var table = this;

    table.$onInit = init;

    ///////////

    function init() {
      _.defaults(table, {
        showName: true,
        showKey: true,
        showActions: true,
      });
    }
  }
})();
