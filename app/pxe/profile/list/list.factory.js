(function () {
  'use strict';

  angular
    .module('app.pxe.profile')
    .factory('PxeProfileList', PxeProfileListFactory);

  /**
   * PxeProfileList Factory
   *
   * @ngInject
   */
  function PxeProfileListFactory (List, ListConfirm) {
    return function () {
      var list = List('pxe/profile');
      list.confirm = ListConfirm(list, 'pxe.profile.modal.delete');

      list.bulk.add('Delete', list.confirm.delete);
      list.bulk.add('Duplicate', list.fire.bind(null, 'duplicate_profiles'));

      return list;
    };
  }
})();
