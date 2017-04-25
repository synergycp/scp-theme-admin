(function () {
  'use strict';

  angular
    .module('app.pxe.install')
    .component('pxeInstallForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'PxeInstallFormCtrl as pxeInstallForm',
      transclude: true,
      templateUrl: 'app/pxe/install/install.form.html'
    })
    .controller('PxeInstallFormCtrl', PxeInstallFormCtrl)
    ;

  /**
   * @ngInject
   */
  function PxeInstallFormCtrl(Select, OsReloadModals, $scope, _, $rootScope) {
    var pxeInstallForm = this;

    pxeInstallForm.$onInit = init;
    pxeInstallForm.server = Select('server').on('change', syncServer);
    pxeInstallForm.isEnabled = true;
    pxeInstallForm.canRAID = false;
    pxeInstallForm.submit = submit;
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
      pxeInstallForm.form.on('reload_server', function(server) {
        pxeInstallForm.server.setSelectedId(server.id);
      })
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

    function submit() {
      var profile = pxeInstallForm.input.profile.selected;
      var edition = (pxeInstallForm.input.edition || {}).selected;
      var raid = pxeInstallForm.input.disk.raid !== 'None' && pxeInstallForm.canRAID ? pxeInstallForm.input.disk.raid : undefined;
      var index = pxeInstallForm.input.disk.index;

      if (!profile) {
        return Alert.warning('Please select an OS Reload Profile.');
      }

      if (profile.iso && !edition) {
        return Alert.warning('Please select an OS Edition.');
      }

      OsReloadModals.openCreate().result.then(function (result) {
        create({
          pxe_profile_id: profile.id,
          disk: {
            raid: raid,
            index: index,
          },
          queue: true,
          edition_id: (edition || {}).id,
          license_key: pxeInstallForm.input.licenseKey,
          password: pxeInstallForm.input.password,
        })
      });
    }

    function create(data) {
      return pxeInstallForm.server.selected
        .all('install')
        .post(data)
        .branch()
        .then(fireChangeEvent)
        .unbranch()
    }
    function fireChangeEvent() {
      pxeInstallForm.form.fire('created');
    }
  }
})();
