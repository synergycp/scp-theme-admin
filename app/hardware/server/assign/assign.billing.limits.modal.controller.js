(function () {
  'use strict';

  angular
    .module('app.hardware.server.assign')
    .controller('ServerAssignBillingLimitModalCtrl', ServerAssignBillingLimitModalCtrl)
    ;

  /**
   * ServerAssignBillingLimitModalCtrl Controller
   *
   * @ngInject
   */
  function ServerAssignBillingLimitModalCtrl(items) {
    var modal = this;

    modal.items = items;
    modal.submit = submit;
    modal.input = {
      limit: '',
    };

    //////////

    function submit() {
      return modal.$close(modal.input);
    }
  }
})();
