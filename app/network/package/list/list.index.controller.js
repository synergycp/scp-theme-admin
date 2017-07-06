(function () {
  'use strict';

  angular
    .module('app.network.package.list')
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
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.getData())
    }
  }
})();
