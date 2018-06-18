(function () {
  'use strict';

  angular
    .module('app.network.forward.gateway.list')
    .factory('ForwardGatewayList', ForwardGatewayListFactory);

  /**
   * ForwardGatewayList Factory
   *
   * @ngInject
   */
  function ForwardGatewayListFactory(ListConfirm, List) {
    return function () {
      var list = List('forward/gateway');
      list.confirm = ListConfirm(list, 'forward.gateway.modal.delete');

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
