(function () {
  'use strict';

  var MODAL = {
    CONFIRM: {
      TPL: 'app/hardware/server/os-reload/modal/modal.confirm.html',
      CTRL: 'OsReloadModalConfirmCtrl',
    },
  };

  angular
    .module('app.hardware.server')
    .component('serverOsReload', {
      require: {
      },
      bindings: {
        server: '=',
      },
      controller: 'ServerOsReloadCtrl as reload',
      transclude: true,
      templateUrl: 'app/hardware/server/os-reload/os-reload.html'
    })
    .controller('ServerOsReloadCtrl', ServerOsReloadCtrl)
    ;

  /**
   * @ngInject
   */
  function ServerOsReloadCtrl(Loader, Select, Alert, InstallList, $scope, $uibModal) {
    var reload = this;

    reload.loader = Loader();
    reload.isEnabled = false;
    reload.input = {
      profile: Select('pxe/profile').on('change', syncProfile),
      edition: null,
      licenseKey: '',
      password: '',
    };

    reload.submit = submit;
    reload.fireChangeEvent = fireChangeEvent;
    reload.$onInit = init;
    reload.delete = deleteInstall;

    //////////

    function init() {
      reload.isEnabled = reload.server.is_pxe_ready;

      reload.list = InstallList(reload.server.id)
        .limitScope($scope);
    }

    function deleteInstall(install) {
      return reload.list
        .delete([install || reload.list.items[0]])
        .branch()
          .then(fireChangeEvent)
        .unbranch()
        ;
    }

    function submit() {
      var profile = reload.input.profile.selected;
      var edition = (reload.input.edition || {}).selected;

      if (!profile) {
        return Alert.warning('Please select an OS Reload Profile.');
      }

      if (profile.iso && !edition) {
        return Alert.warning('Please select an OS Edition.');
      }

      var modal = $uibModal.open({
        templateUrl: MODAL.CONFIRM.TPL,
        controller: MODAL.CONFIRM.CTRL,
        bindToController: true,
        controllerAs: 'modal',
        resolve: {
        },
      });

      return modal.result.then(function (result) {
        return create({
          pxe_profile_id: profile.id,
          edition_id: (edition || {}).id,
          license_key: reload.input.licenseKey,
          password: result.password,
        });
      });
    }

    function syncProfile(profile) {
      if (profile.iso) {
        reload.input.edition = Select('pxe/iso/'+profile.iso.id+'/edition')
          .on('change', syncEdition);
      } else {
        reload.input.edition = null;
      }
    }

    function syncEdition(edition) {
      reload.input.licenseKey = edition.key || reload.input.licenseKey;
    }

    function create(data) {
      return reload.loader.during(reload.server
        .all('install')
        .post(data)
        .branch()
          .then(updateInstall)
          .then(fireChangeEvent)
        .unbranch()
      );
    }

    function updateInstall(response) {
      reload.list.items.push(response);
    }

    function fireChangeEvent() {
      reload.server.fire('change');
    }
  }
})();
