(function () {
  'use strict';

  angular
    .module('app.network.group.list')
    .controller('GroupIndexCtrl', GroupIndexCtrl)
    ;

  /**
   * @ngInject
   */
  function GroupIndexCtrl(GroupList, ListFilter, EventEmitter) {
    var vm = this;

    vm.list = GroupList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'group',
      },
    };
    EventEmitter().bindTo(vm.create);

    activate();

    ////////////

    function activate() {
    }

    function create() {
      vm.list.create(vm.create.getData())
        .then(function() {
          vm.create.fire('create');  
        });
    }
  }
})();
