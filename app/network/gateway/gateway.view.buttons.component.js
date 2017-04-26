(function () {
    'use strict';

    angular
        .module('app.network.gateway')
        .component('gatewayButtons', {
            require: {},
            bindings: {
                gateway: '=',
            },
            controller: 'GatewayButtonsCtrl as buttons',
            transclude: true,
            templateUrl: 'app/network/gateway/gateway.view.buttons.html'
        })
        .controller('GatewayButtonsCtrl', GatewayButtonsCtrl);

    /**
     * @ngInject
     */
    function GatewayButtonsCtrl(GatewayList, Loader, $state) {
        var buttons = this;

        buttons.loader = Loader();
        buttons.$onInit = init;
        buttons.delete = doDelete;


        //////////

        function init() {

        }

        function doDelete() {
            return buttons.loader.during(
                GatewayList()
                    .confirm
                    .delete([buttons.gateway])
                    .result.then(transferToList)
            );
        }

        function transferToList() {
            $state.go('app.network.gateway.list');
        }
    }
})();
