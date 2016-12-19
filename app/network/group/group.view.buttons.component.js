(function () {
  'use strict';

  angular
    .module('app.network.group')
    .component('groupButtons', {
      require: {},
      bindings: {
        group: '=',
      },
      controller: 'GroupButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/network/group/group.view.buttons.html'
    })
    .controller('GroupButtonsCtrl', GroupButtonsCtrl);

  /**
   * @ngInject
   */
  function GroupButtonsCtrl(GroupList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        GroupList()
          .confirm
          .delete([buttons.group])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.network.group.list');
    }
  }
})();
