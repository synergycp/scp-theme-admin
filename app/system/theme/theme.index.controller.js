(function () {
  'use strict';

  var API = {
    THEME: 'system/theme/customize',
  };

  angular
    .module('app.system.theme')
    .controller('ThemeIndexCtrl', ThemeIndexCtrl);

  /**
   * ThemeIndex Controller
   *
   * @ngInject
   */
  function ThemeIndexCtrl(_, $scope, $state, $stateParams, $q, Loader, Alert, EventEmitter, Api, LicenseService) {
    var vm = this;
    var $api = Api.all(API.THEME);

    vm.allowed = false;
    vm.list = EventEmitter();
    vm.refresh = refresh;

    vm.patch = patch;
    vm.logs = {
      filter: {
        target_type: 'system.theme.customization',
      },
    };
    vm.edit = {
      input: {},
      submit: patch,
      loader: Loader(),
    };
    vm.refreshLicense = refreshLicense;

    EventEmitter().bindTo(vm.edit);

    activate();

    //////////

    function activate() {
      refresh();
    }

    function refresh() {
      return vm.edit.loader.during(
        $api.get('').then(function (result) {
          vm.allowed = result.allowed;

          _.assign(vm.edit.input, result.theme);

          vm.edit.fire('load');
        })
      )
    }

    function patch() {
      return vm.edit.loader.during(
        $api.post(vm.edit.getData())
      );
    }
    
    function refreshLicense() {
      return vm.edit.loader.during(
        LicenseService.refresh()
          .then(refresh)
      );
    }
  }
})();
