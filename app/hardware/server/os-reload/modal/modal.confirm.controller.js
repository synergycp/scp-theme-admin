(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('OsReloadModalConfirmCtrl', OsReloadModalConfirmCtrl)
    ;

  /**
   * OsReloadModalConfirm Controller
   *
   * @ngInject
   */
  function OsReloadModalConfirmCtrl(StringGenerator, Alert) {
    var modal = this;
    var password = StringGenerator()
      .noSpecialCharacters()
      .length(12);

    modal.password = {
      value: password.generate(),
      generate: password.generate,
    };
    modal.confirmed = false;
    modal.submit = submit;

    activate();

    //////////

    function activate() {

    }

    function submit() {
      if (!modal.confirmed) {
        Alert.warning('Please check the box confirming this installation.');

        return;
      }

      return modal.$close({
        password: modal.password.value,
      });
    }
  }
})();
