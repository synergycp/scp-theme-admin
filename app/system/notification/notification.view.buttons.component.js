(function () {
  'use strict';

  angular
    .module('app.system.notification')
    .component('notificationButtons', {
      require: {},
      bindings: {
        notification: '=',
      },
      controller: 'NotificationButtonsCtrl as buttons',
      transclude: true,
      templateUrl: 'app/system/notification/notification.view.buttons.html'
    })
    .controller('NotificationButtonsCtrl', NotificationButtonsCtrl);

  /**
   * @ngInject
   */
  function NotificationButtonsCtrl(NotificationList, Loader, $state) {
    var buttons = this;

    buttons.loader = Loader();
    buttons.$onInit = init;
    buttons.delete = doDelete;


    //////////

    function init() {

    }

    function doDelete() {
      return buttons.loader.during(
        NotificationList()
          .confirm
          .delete([buttons.notification])
          .result.then(transferToList)
      );
    }

    function transferToList() {
      $state.go('app.system.notification.list');
    }
  }
})();
