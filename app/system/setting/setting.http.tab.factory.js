(function () {
  'use strict';

  angular
    .module('app.system.setting')
    .factory('HttpTab', HttpTab);

  /**
   * HttpTab Factory
   *
   * @ngInject
   */
  function HttpTab(Loader, Api) {
    return function(vm) {
      var tab = this;
      var $api = Api.one('http/ssl');

      tab.trans = 'system.setting.http.TITLE';
      tab.active = false;
      tab.visible = true;
      tab.body = 'app/system/setting/setting.http.html';
      tab.ssl = {
        loader: Loader(),
        input: {
          // TODO auto fill user email
          email: '',
        },
        enabled: false,
        required: false,
        refresh: refreshSsl,
        disable: disableSsl,
        enable: enableSsl,
        patch: patchSsl,
      };
      tab.patchChanges = patchChanges;

      activate();

      //////////////

      function activate() {
        tab.ssl.refresh();
      }

      function patchChanges() {
      }

      function patchSsl(data) {
        return tab.ssl.loader.during(
          $api
            .patch(data)
            .then(storeSslStatus)
            .then(vm.refresh)
        );
      }

      function disableSsl() {
        return tab.ssl.loader.during(
          $api
            .remove()
            .then(function () {
              tab.ssl.enabled = false;
              tab.ssl.required = false;
            })
            .then(vm.refresh)
            .then(function () {
              window.location.protocol = "http:";
            })
        );
      }

      function enableSsl() {
        return tab.ssl.loader.during(
          Api
            .all('http/ssl')
            .post({
              email: tab.ssl.input.email,
            })
            .then(storeSslStatus)
            .then(vm.refresh)
            .then(function () {
              window.location.protocol = "https:";
            })
        );
      }

      function refreshSsl() {
        return tab.ssl.loader.during(
          $api
            .get()
            .then(storeSslStatus)
        );
      }

      function storeSslStatus(response) {
        tab.ssl.enabled = response.enabled;
        tab.ssl.required = response.required;
      }
    }
  }
})();
