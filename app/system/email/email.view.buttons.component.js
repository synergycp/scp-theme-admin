(function () {
  'use strict';

  angular
    .module('app.system.email')
    .component('emailButtons', {
      require: {},
      bindings: {
        email: '=',
      },
      controller: 'EmailButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/system/email/email.view.buttons.html'
    })
    .controller('EmailButtonsCtrl', EmailButtonsCtrl);

  /**
   * @ngInject
   */
  function EmailButtonsCtrl(EmailList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        EmailList()
          .confirm
          .delete([buttons.email])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.system.email.list');
    }
  }
})();
