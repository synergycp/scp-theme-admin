(function () {
  'use strict';

  var INPUTS = {
    name: '',
    install_max_concurrent: '',
    http: {
      host: '',
      port: '',
      use_https: false,
      api_key: ''
    },
    ssh: {
      port: '',
      public_key: '',
    },
  };

  angular
    .module('app.pxe')
    .component('pxeFileForm', {
      require: {},
      bindings: {
        form: '=',
      },
      controller: 'PxeFileFormCtrl as pxeFileForm',
      transclude: true,
      templateUrl: 'app/pxe/file/file.form.html'
    })
    .controller('PxeFileFormCtrl', PxeFileFormCtrl)
  ;

  /**
   * @ngInject
   */
  function PxeFileFormCtrl(Select, $scope, _, $rootScope) {
    var pxeFileForm = this;

    pxeFileForm.$onInit = init;
    pxeFileForm.input = _.clone(INPUTS);
    pxeFileForm.parentServers = Select('pxe/file');
    pxeFileForm.groups = Select('group');

    //////////

    function init() {
      pxeFileForm.form.getData = getData;

      if (pxeFileForm.form.on) {
        pxeFileForm.form
          .on('load', storeState)
          .on('change', storeState)
        ;
      }
    }

    function fillFormInputs() {
      _.overwrite(pxeFileForm.input, pxeFileForm.form.input);
    }

    function storeState(response) {
      $rootScope.$evalAsync(function () {
        fillFormInputs();
        pxeFileForm.groups.selected = response.group;
        pxeFileForm.parentServers.selected = response.parent;
        pxeFileForm.parentServers = pxeFileForm.parentServers.filter({'id_not_in[]': response.id})
      });
    }

    function getData() {
        var data = _.clone(pxeFileForm.input);
        data.group_id = pxeFileForm.groups.getSelected('id') || null;
        data.parent_id = pxeFileForm.parentServers.getSelected('id') || null;

      return data;
    }
  }
})();
