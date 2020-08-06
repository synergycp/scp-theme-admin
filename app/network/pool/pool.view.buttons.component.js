(function () {
  'use strict';

  angular
    .module('app.network.pool')
    .component('poolButtons', {
      require: {},
      bindings: {
        pool: '=',
      },
      controller: 'PoolButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/network/pool/pool.view.buttons.html'
    })
    .controller('PoolButtonsCtrl', PoolButtonsCtrl);

  /**
   * @ngInject
   */
  function PoolButtonsCtrl(PoolList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        PoolList()
          .confirm
          .delete([buttons.pool])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.network.pool.list');
    }
  }
})();
