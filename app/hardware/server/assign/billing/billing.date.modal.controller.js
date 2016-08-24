(function () {
  'use strict';

  angular
    .module('app.hardware.server.assign')
    .controller('ServerAssignBillingDateModalCtrl', ServerAssignBillingDateModalCtrl)
    ;

  /**
   * ServerAssignBillingDateModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignBillingDateModalCtrl(Select, items) {
    var modal = this;

    modal.items = items;
    modal.submit = submit;
    modal.input = {
      date: {
        value: '',
        isOpen: true,
      },
    };

    //////////

    function submit() {
      return modal.$close({
        date: modal.input.date.value,
      });
    }
  }
})();
