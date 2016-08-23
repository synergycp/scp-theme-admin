(function () {
  'use strict';

  var INPUTS = {
    name: '',
    billing_id: '',
    preseed: null,
    boot_script: null,
    iso: null,
    access_client: false,
  };

  angular
    .module('app.pxe')
    .component('profileForm', {
      require: {
      },
      bindings: {
        form: '=',
      },
      controller: 'ProfileFormCtrl as profileForm',
      transclude: true,
      templateUrl: 'app/pxe/profile/profile.form.html'
    })
    .controller('ProfileFormCtrl', ProfileFormCtrl)
    ;

  /**
   * @ngInject
   */
  function ProfileFormCtrl(Select, $scope, _) {
    var profileForm = this;

    profileForm.$onInit = init;
    profileForm.input = _.clone(INPUTS);
    profileForm.preseeds = Select('pxe/preseed');
    profileForm.bootScripts = Select('pxe/template');
    profileForm.isos = Select('pxe/iso').on('change', onIsoChange);
    profileForm.isos.selectedEdition = null;
    profileForm.emailTemplate = Select('email/template');
    profileForm.shellScripts = Select('pxe/shell').multi();
    profileForm.drivers = Select('pxe/driver').multi();

    //////////

    function init() {
      profileForm.form.getData = getData;
      if (profileForm.form.loader && !profileForm.form.loader.active) {
        syncResponse(profileForm.form.input);
      }

      (profileForm.form.on || function() {})(['change', 'load'], syncResponse);
    }

    function onIsoChange() {
      setupIsoDefaults();
      $scope.$evalAsync(function() {
        profileForm.isos.selectedEdition = null;
      });
    }

    function setupIsoDefaults() {
      var iso = profileForm.input.iso;
      if (!iso) {
        profileForm.isos.editions = null;
        return;
      }

      var url = 'pxe/iso/'+iso.id+'/edition';
      $scope.$evalAsync(function() {
        profileForm.isos.editions = Select(url).filter({
          is_enabled: true,
        });
        profileForm.isos.editions.load();
      });
    }

    function syncResponse(response) {
      _.overwrite(profileForm.input, profileForm.form.input);
      _.setContents(profileForm.shellScripts.selected, response.shell.after);
      _.setContents(profileForm.drivers.selected, response.drivers);
      setupIsoDefaults(response.iso);
      profileForm.isos.selectedEdition = response.iso ? response.iso.edition : null;
      profileForm.emailTemplate.selected = response.email.template;
    }

    function getData() {
      var data = _.clone(profileForm.input);

      data.shell = {
        after: _.map(profileForm.shellScripts.selected, 'id'),
      };
      data.drivers = _.map(profileForm.drivers.selected, 'id');
      data.iso = profileForm.input.iso ? {
        id: profileForm.input.iso.id,
        edition: profileForm.isos.selectedEdition ? {
          id: profileForm.isos.selectedEdition.id,
        } : null,
      } : null;
      data.email = {
        template: {
          id: profileForm.emailTemplate.getSelected('id') || null,
        },
      };

      return data;
    }
  }
})();
