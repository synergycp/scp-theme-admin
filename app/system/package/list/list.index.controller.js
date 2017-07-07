(function () {
  'use strict';

  angular
    .module('app.system.package.list')
    .controller('PackageIndexCtrl', PackageIndexCtrl);

  /**
   * @ngInject
   */
  function PackageIndexCtrl(PackageList) {
    var vm = this;

    vm.list = PackageList();
    // vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    // vm.logs = {
    //   filter: {
    //     target_type: 'switch',
    //   },
    // };

    activate();

    ////////////

    function activate() {
      vm.list.load().then(function() {

        vm.list.items = [
          {
            id: 1,
            name: 'Test package name',
            version: '2.3',
            enabled: true
          },
          {
            id: 2,
            name: 'Test package name2',
            version: '1.0',
            enabled: false
          }
        ]
      });
    }

    function create() {
      vm.list.create(vm.create.getData())
    }
  }
})();
