(function () {
  'use strict';

  angular
    .module('app.network.group')
    .controller('GroupIndexCtrl', GroupIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function GroupIndexCtrl(GroupList) {
    var vm = this;

    vm.list = GroupList();

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'group',
      },
    };

    activate();

    ////////////

    function activate() {
      vm.list.load();
    }

    function create() {
      vm.list.create(vm.create.getData());
    }
  }
})();
