(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('EmailListCtrl', EmailListCtrl);

  /**
   * @ngInject
   */
  function EmailListCtrl(List) {
    var vm = this;

    vm.list = List('email/template');
    vm.list.bulk.add('Delete', vm.list.delete);

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
