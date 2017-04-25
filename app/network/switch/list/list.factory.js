(function () {
  'use strict';

  angular
    .module('app.network.switch.list')
    .factory('SwitchList', SwitchListFactory);

  /**
   * SwitchList Factory
   *
   * @ngInject
   */
  function SwitchListFactory (List, ListConfirm, $q) {
    return function () {
        var list = List('switch');
        var confirm = ListConfirm(list, 'switch.modal.delete');

        list.bulk.add('Start scan', startScan);
        list.bulk.add('Delete', confirm.delete);

        function startScan(items) {
          $q.all(
            _.map(items, function(item) {
              return item.all('scan').post()
            })
          ).then(list.load)
          // TODO: refresh logs
        }

        return list;
    };
  }
})();
