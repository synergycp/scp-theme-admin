(function () {
  'use strict';

  angular
    .module('app.user.client.view')
    .component('profileButtons', {
      require: {},
      bindings: {
        profile: '=',
      },
      controller: 'ProfileButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/pxe/profile/profile.view.buttons.html'
    })
    .controller('ProfileButtonsCtrl', ProfileButtonsCtrl);

  /**
   * @ngInject
   */
  function ProfileButtonsCtrl(PxeProfileList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        PxeProfileList()
          .confirm
          .delete([buttons.profile])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.pxe.profile.list');
    }
  }
})();
