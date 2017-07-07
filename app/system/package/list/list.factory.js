(function () {
  'use strict';

  angular
    .module('app.system.package.list')
    .factory('PackageList', PackageListFactory);

  /**
   * SwitchList Factory
   *
   * @ngInject
   */
  function PackageListFactory (List, ListConfirm) {
    return function () {
        var list = List('package');
        var confirm = ListConfirm(list, 'package.modal.delete');

        list.bulk.add('Enable', enable);
        list.bulk.add('Disable', disable);
        list.bulk.add('Delete', confirm.delete);

        return list;

        function enable() {
          console.log('enable');
        }

        function disable() {
          console.log('disable');
        }
    };
  }
})();
