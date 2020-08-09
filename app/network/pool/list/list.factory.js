(function () {
  'use strict';

  angular
    .module('app.network.pool.list')
    .factory('PoolList', PoolListFactory);

  /**
   * PoolList Factory
   *
   * @ngInject
   */
  function PoolListFactory (List, ListConfirm, PoolAssign) {
    return function () {
      var list = List('ip/pool');
      list.confirm = ListConfirm(list, 'pool.modal.delete');

      list.bulk.add('Assign IP Group', wrapChangeEvent(PoolAssign.group));
      list.bulk.add('Delete', list.confirm.delete);

      return list;

      function wrapChangeEvent(callback) {
        return function () {
          return callback.apply(null, arguments).then(fireChangeEvent);
        };
      }

      function fireChangeEvent(arg) {
        list.fire('change', arg);

        return arg;
      }
    };
  }
})();
