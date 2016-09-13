(function () {
  'use strict';

  angular
    .module('app.network.entity')
    .factory('EntityList', EntityListFactory);

  /**
   * EntityList Factory
   *
   * @ngInject
   */
  function EntityListFactory (List, ListConfirm, EntityAssign) {
    return function () {
      var list = List('entity');
      var confirm = ListConfirm(list, 'entity.modal.delete');

      list.bulk.add('Assign IP Group', wrapChangeEvent(EntityAssign.group));
      list.bulk.add('Delete', confirm.delete);

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
