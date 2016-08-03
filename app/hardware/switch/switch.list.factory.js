(function () {
  'use strict';

  angular
    .module('app.hardware.switch')
    .factory('SwitchList', SwitchListFactory);

  /**
   * SwitchList Factory
   *
   * @ngInject
   */
  function SwitchListFactory (List, ListConfirm) {
    return function () {
        var list = List('switch');
        var confirm = ListConfirm(list, 'hardware.switch.modal.delete');

        list.bulk.add('Delete', confirm.delete);

        return list;
    };
  }
})();
