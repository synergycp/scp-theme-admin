(function () {
  'use strict';

  angular
    .module('app.system.version')
    .service('SystemVersionModalService', makeSystemVersionModal);

  /**
   * @ngInject
   * @return {{}}
   */
  function makeSystemVersionModal(VersionService, Modal, RouteHelpers, Api, Alert, $translate) {
    var SystemVersionModal = {};
    SystemVersionModal.update = function () {
      RouteHelpers.loadLang('version');
      return Modal
        .confirm([], 'version.modal.update')
        .templateUrl('app/system/version/modal/modal.version.update.html')
        .data(VersionService.getLatest().then(function (latest) {
          return {
            version: latest,
          }
        }))
        .open()
        .result
        .then(function () {
          // User chose to update, so send the API request.
          Api.all('version').post().then(function () {
            return $translate('version.UPDATE_STARTED');
          }).then(function (i18nResult) {
            Alert.success(i18nResult);
          });
        });
    };
    return SystemVersionModal;
  }
})();
