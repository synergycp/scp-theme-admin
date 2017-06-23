(function () {
    'use strict';

    angular
        .module('app.network.gateway.list')
        .component('gatewayTable', {
            require: {
                list: '\^list',
            },
            bindings: {
                showHostname: '=?',
                showPortLimit: '=?',
                showActions: '=?',
            },
            controller: 'GatewayTableCtrl as table',
            transclude: true,
            templateUrl: 'app/network/gateway/list/list.table.html'
        })
        .controller('GatewayTableCtrl', GatewayTableCtrl)
    ;

    /**
     * @ngInject
     */
    function GatewayTableCtrl() {
        var table = this;

        table.$onInit = init;

        ///////////

        function init() {
            _.defaults(table, {
                showHostname: true,
                showPortLimit: true,
                showActions: true,
            });
        }
    }
})();
