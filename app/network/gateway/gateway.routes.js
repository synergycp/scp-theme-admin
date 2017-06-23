(function () {
    'use strict';

    angular
        .module('app.network.gateway')
        .config(routeConfig)
    ;

    /**
     * @ngInject
     */
    function routeConfig($stateProvider, RouteHelpersProvider) {
        var helper = RouteHelpersProvider;
        $stateProvider
            .state('app.network.gateway', {
                url: '/forward/gateway',
                abstract: true,
                template: helper.dummyTemplate,
                resolve: helper.resolveFor('lang:gateway'),
            })
            .state('app.network.gateway.view', {
                url: '/:id',
                title: 'View Gateway',
                controller: 'GatewayViewCtrl as vm',
                templateUrl: helper.basepath('network/gateway/gateway.view.html'),
            })
        ;

        helper.url.map('forward/gateway/?([0-9]*)', mapGatewayUrl);
        helper.sso.map('forward/gateway', function ($state, options) {
            return mapGatewayUrl($state, options.id);
        });

        function mapGatewayUrl ($state, id) {
            var params = {
                id: id,
            };

            return $state.href(
                'app.network.gateway.' + (id ? 'view' : 'list'),
                params
            );
        }
    }
})();
