(function () {
  'use strict';

  angular
    .module('app.system')
    .controller('EmailListCtrl', EmailListCtrl);

  /**
   * @ngInject
   */
  function EmailListCtrl(EmailList) {
    var vm = this;

    vm.list = EmailList();

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
