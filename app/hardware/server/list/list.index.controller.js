(function () {
  'use strict';

  angular
    .module('app.hardware.server')
    .controller('ServerIndexCtrl', ServerIndexCtrl)
    ;

  /**
   * ServerIndex Controller
   *
   * @ngInject
   */
  function ServerIndexCtrl(ServerList, ListFilter, EventEmitter) {
    var vm = this;

    vm.list = ServerList();
    vm.filters = ListFilter(vm.list);
    vm.create = {
      input: {},
      submit: create,
    };
    EventEmitter().bindTo(vm.create);

    vm.logs = {
      filter: {
        target_type: 'server',
      },
    };

    activate();

    ////////////

    function activate() {
    }

    function create() {
      vm.list.create(vm.create.getData())
        .then(function (item) {
          vm.create.fire('created', item);
        })
    }
  }
})();
