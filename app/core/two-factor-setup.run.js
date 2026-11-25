(function () {
  'use strict';

  var NOTICE_EVERY_MS = 30000;

  angular
    .module('app.core')
    .run(TwoFactorSetupRedirect)
    ;

  /**
   * [BA-271] While "Require two factor authentication for administrators" is
   * on, an administrator who has not set it up can only reach its setup: the
   * API answers everything else with a 403 whose data has
   * `two_factor_setup_required`. Take them to Account > Security and say why,
   * instead of showing one error per refused request.
   *
   * @ngInject
   */
  function TwoFactorSetupRedirect(Restangular, $state, $translate, Alert, _) {
    var lastNotice = 0;

    Restangular.addErrorInterceptor(function (response) {
      if (response.status !== 403 || !_.get(response, 'data.data.two_factor_setup_required')) {
        return true;
      }

      sendToSetup();

      // Handled here: the request is neither resolved nor rejected, so the
      // page that made it shows no error of its own.
      return false;
    });

    function sendToSetup() {
      if (!($state.is('app.account.settings') && $state.params.tab === 'security')) {
        $state.go('app.account.settings', {tab: 'security'});
      }

      var now = Date.now();
      if (now - lastNotice < NOTICE_EVERY_MS) {
        return;
      }

      lastNotice = now;
      $translate('app.two_factor_setup.REQUIRED').then(function (text) {
        Alert.warning(text, NOTICE_EVERY_MS);
      });
    }
  }
})();
