(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .component('entityButtons', {
      require: {},
      bindings: {
        entity: '=',
      },
      controller: 'EntityButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/network/entity/entity.view.buttons.html'
    })
    .controller('EntityButtonsCtrl', EntityButtonsCtrl);

  /**
   * @ngInject
   */
  function EntityButtonsCtrl(EntityList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        EntityList()
          .confirm
          .delete([buttons.entity])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.network.entity.list');
    }
  }
})();
