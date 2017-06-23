(function () {
    angular
        .module('app.network.gateway.list')
        .config(routeConfig)
    ;

    /**
     * @ngInject
     */
    function routeConfig($stateProvider, RouteHelpersProvider) {
        var helper = RouteHelpersProvider;
        $stateProvider
            .state('app.network.gateway.list', {
                url: '?q',
                title: 'Gateways',
                controller: 'GatewayIndexCtrl as vm',
                reloadOnSearch: false,
                templateUrl: helper.basepath('network/gateway/list/list.index.html'),
            })
        ;
    }
})();
