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
  function ProfileFormCtrl(Api, _) {
    var profileForm = this;
    var $preseeds = Api.all('pxe/preseed');
    var $bootScripts = Api.all('pxe/template');
    var $isos = Api.all('pxe/iso');

    profileForm.$onInit = init;
    profileForm.preseeds = {
      items: [],
      load: loadPreseeds,
    };
    profileForm.bootScripts = {
      items: [],
      load: loadBootScripts,
    };
    profileForm.isos = {
      items: [],
      load: loadIsos,
    };

    //////////

    function init() {
      profileForm.form.getData = getData;
      profileForm.input = profileForm.form.input = profileForm.form.input || {};
      _.assign(profileForm.input, INPUTS);
    }

    function getData() {
      return _.clone(profileForm.input);
    }

    function loadPreseeds(search) {
      $preseeds.getList({ q: search })
        .then(storePreseeds)
        ;
    }

    function storePreseeds(preseeds) {
      _.setContents(profileForm.preseeds.items, preseeds);
    }

    function loadBootScripts(search) {
      $bootScripts.getList({ q: search })
        .then(storeBootScripts)
        ;
    }

    function storeBootScripts(bootScripts) {
      _.setContents(profileForm.bootScripts.items, bootScripts);
    }

    function loadIsos(search) {
      $isos.getList({ q: search })
        .then(storeIsos)
        ;
    }

    function storeIsos(bootScripts) {
      _.setContents(profileForm.isos.items, bootScripts);
    }
  }
})();
