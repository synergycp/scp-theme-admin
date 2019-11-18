(function () {
  'use strict';

  angular
    .module('app.system.package.list')
    .factory('PackageList', PackageListFactory);

  /**
   * PackageList Factory
   *
   * @ngInject
   */
  function PackageListFactory (List, ListConfirm) {
    return function () {
      var list = List('package');
      list.confirm = ListConfirm(list, 'package.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
