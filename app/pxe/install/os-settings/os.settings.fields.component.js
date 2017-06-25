(function () {
  'use strict';

  angular
    .module('app.pxe.install')
    .component('osSettingsFields', {
      require: '?control',
      bindings: {
        control: '=',
        server: '=',
        lang: '@'
      },
      controller: 'OsSettingsFields as pxeInstallForm',
      transclude: true,
      templateUrl: 'app/pxe/install/os-settings/os.settings.fields.html'
    })
    .controller('OsSettingsFields', OsSettingsFields)
    ;

  /**
   * @ngInject
   */
  function OsSettingsFields(Select, OsReloadModals, $scope, _, $rootScope) {
    var pxeInstallForm = this;
    pxeInstallForm.$onInit = init;
    pxeInstallForm.canRAID = false;
    pxeInstallForm.input = {
      profile: Select('pxe/profile').on('change', syncProfile),
      disk: {
        raid: 'None',
        index: 0,
      },
      edition: null,
      licenseKey: '',
      password: '',
    };


    //////////

    function init() {
      pxeInstallForm.control.getData = getData;
      pxeInstallForm.server.on('change', syncServer);
    }

    function syncServer(server) {
      server.get().then(function (res) {
        pxeInstallForm.isEnabled = res.is_pxe_ready;
        pxeInstallForm.canRAID = res.raid_soft_ready;
      });
    }

    function syncProfile(profile) {
      if (profile.iso) {
        pxeInstallForm.input.edition = Select('pxe/iso/' + profile.iso.id + '/edition')
          .on('change', syncEdition);
      } else {
        pxeInstallForm.input.edition = null;
      }
    }

    function syncEdition(edition) {
      pxeInstallForm.input.licenseKey = edition.key || pxeInstallForm.input.licenseKey;
    }

    function getData() {
      return {
        profile: pxeInstallForm.input.profile.selected,
        edition: (pxeInstallForm.input.edition || {}).selected,
        raid: pxeInstallForm.input.disk.raid !== 'None' && pxeInstallForm.canRAID ? pxeInstallForm.input.disk.raid : undefined,
        index: pxeInstallForm.input.disk.index,
        licenseKey: pxeInstallForm.input.licenseKey,
        password: pxeInstallForm.input.password,
      }
    }
  }
})();
