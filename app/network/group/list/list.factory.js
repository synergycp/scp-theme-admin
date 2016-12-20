(function () {
  'use strict';

  angular
    .module('app.network.group.list')
    .factory('GroupList', GroupListFactory);

  /**
   * GroupList Factory
   *
   * @ngInject
   */
  function GroupListFactory(ListConfirm, List) {
    return function () {
      var list = List('group');
      list.confirm = ListConfirm(list, 'group.modal.delete');

      list.bulk.add(
        'Reserve',
        list.patch.bind(null, {
          reserved: true
        })
      );

      list.bulk.add(
        'Unreserve',
        list.patch.bind(null, {
          reserved: false
        })
      );

      list.bulk.add('Delete', list.confirm.delete);

      return list;
    };
  }
})();
