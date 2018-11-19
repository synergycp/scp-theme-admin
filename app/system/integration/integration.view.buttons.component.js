(function () {
  'use strict';

  angular
    .module('app.system.integration')
    .component('integrationButtons', {
      require: {},
      bindings: {
        integration: '=',
      },
      controller: 'IntegrationButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/system/integration/integration.view.buttons.html'
    })
    .controller('IntegrationButtonsCtrl', IntegrationButtonsCtrl);

  /**
   * @ngInject
   */
  function IntegrationButtonsCtrl(IntegrationList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        IntegrationList()
          .confirm
          .delete([buttons.integration])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.system.integration.list');
    }
  }
})();
