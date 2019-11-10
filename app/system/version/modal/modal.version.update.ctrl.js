(function () {
  'use strict';

  angular
    .module('app.system.version')
    .controller('SystemVersionModalUpdateCtrl', SystemVersionModalUpdateCtrl);

  /**
   * @ngInject
   * @param VersionService
   * @constructor
   */
  function SystemVersionModalUpdateCtrl(VersionService, $q, $scope, _, Api, $translate, Alert, Loader) {
    var modal = this;
    modal.lang = 'version.modal.update';
    modal.onChangeReleaseChannel = onChangeReleaseChannel;
    modal.isNewVersionAvailable = isNewVersionAvailable;
    modal.loader = Loader();
    modal.submit = onSubmit;
    modal.data = {
      submitClass: 'btn-primary',
    };

    modal.$onInit = refresh;

    function onChangeReleaseChannel() {
      return modal.loader.during(
        VersionService.getLatestForReleaseChannel(modal.releaseChannel).then(function (latest) {
          modal.latest = latest;
        })
      );
    }

    function refresh() {
      return modal.loader.during(
        $q.all([VersionService.getLatest(), VersionService.getCurrent(), VersionService.getReleaseChannel()])
          .then(function (results) {
            modal.latest = results[0];
            modal.current = results[1];
            modal.releaseChannel = results[2];
          })
      );
    }

    function isNewVersionAvailable() {
      return modal.latest && modal.current && modal.latest.semver !== modal.current.semver;
    }

    function onSubmit() {
      // User chose to update, so send the API request.
      return modal.loader.during(
        Api.all('version').post({
          release_channel: modal.releaseChannel,
        }).then(function () {
          return $translate('version.UPDATE_STARTED');
        }).then(function (i18nResult) {
          Alert.success(i18nResult);
          modal.$close();
        })
      );
    }
  }
})();
