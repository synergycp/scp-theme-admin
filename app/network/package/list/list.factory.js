(function () {
  'use strict';

  angular
    .module('app.network.package.list')
    .factory('PackageList', PackageListFactory);

  /**
   * SwitchList Factory
   *
   * @ngInject
   */
  function PackageListFactory (List, ListConfirm, $q) {
    return function () {
        var list = List('package');
        // var confirm = ListConfirm(list, 'switch.modal.delete');

        // list.bulk.add('Start scan', startScan);
        // list.bulk.add('Delete', confirm.delete);

        return list;
    };
  }
})();
