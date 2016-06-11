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
  function ProfileFormCtrl(Select, _) {
    var profileForm = this;

    profileForm.$onInit = init;
    profileForm.preseeds = Select('pxe/preseed');
    profileForm.bootScripts = Select('pxe/template');
    profileForm.isos = Select('pxe/iso');
    profileForm.shellScripts = Select('pxe/shell').multi();
    profileForm.drivers = Select('pxe/driver').multi();

    //////////

    function init() {
      profileForm.form.getData = getData;
      profileForm.input = profileForm.form.input = profileForm.form.input || {};
      _.assign(profileForm.input, INPUTS);

      if (profileForm.form.on) {
        subscribeTo(profileForm.form);
      }
    }

    function subscribeTo(data) {
      data.on(['load', 'change'], function (response) {
        _.setContents(profileForm.shellScripts.selected, response.shell.after);
        _.setContents(profileForm.drivers.selected, response.drivers);
      });
    }

    function getData() {
      var data = _.clone(profileForm.input);

      data.shell = {
        after: _.map(profileForm.shellScripts.selected, 'id'),
      };
      data.drivers = _.map(profileForm.drivers.selected, 'id');

      return data;
    }
  }
})();
