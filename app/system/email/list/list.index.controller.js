(function () {
  'use strict';

  angular
    .module('app.system.email.list')
    .controller('EmailIndexCtrl', EmailIndexCtrl);

  /**
   * @ngInject
   */
  function EmailIndexCtrl(EmailList, ListFilter) {
    var vm = this;

    vm.list = EmailList();
    vm.filters = ListFilter(vm.list);

    vm.create = {
      input: {},
      submit: create,
    };

    vm.logs = {
      filter: {
        target_type: 'email-template',
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
