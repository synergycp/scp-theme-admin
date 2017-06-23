(function () {
    'use strict';

    angular
        .module('app.network')
        .factory('GatewayList', GatewayListFactory);

    /**
     * GatewayList Factory
     *
     * @ngInject
     */
    function GatewayListFactory(List, ListConfirm, $stateParams) {
        return function () {
            var list = List('forward/gateway').filter({
                group: $stateParams.group,
                switch: $stateParams.switch,
                client: $stateParams.client,
            });

            var confirm = ListConfirm(list, 'gateway.modal.delete');

            list.confirm = ListConfirm(list, 'gateway.modal.delete');
            list.bulk.add('Delete', confirm.delete);

            return list;
        };
    }
})();
