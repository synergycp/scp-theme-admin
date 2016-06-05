(function () {
  'use strict';

  var INPUTS = {
    name: '',
    billing_id: '',
    preseed: {
      id: null,
      name: '',
    },
    boot_script: {
      id: null,
      name: '',
    },
    iso: {
      id: null,
      name: '',
    },
    access_client: false,
  };

  angular
    .module('app.pxe')
    .component('profileForm', {
      require: {
      },
      bindings: {
        input: '=',
      },
      controller: 'ProfileFormCtrl as profileForm',
      transclude: true,
      templateUrl: 'app/pxe/profile/profile.form.html'
    })
    .controller('ProfileFormCtrl', ProfileFormCtrl)
    ;

  function ProfileFormCtrl() {
    var profileForm = this;

    profileForm.$onInit = init;

    //////////

    function init() {
      _.assign(profileForm.input, INPUTS);
    }
  }
})();
