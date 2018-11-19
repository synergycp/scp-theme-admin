(function () {
    'use strict';

    var INPUTS = {
        name: '',
        hostname: '',
        api_key: '',
        port_limit: '',
    };

    angular
        .module('app.network.forward.gateway')
        .component('forwardGatewayForm', {
            require: {},
            bindings: {
                form: '=',
            },
            controller: 'ForwardGatewayFormCtrl as gatewayForm',
            transclude: true,
            templateUrl: 'app/network/forward/gateway/gateway.form.html'
        })
        .controller('ForwardGatewayFormCtrl', ForwardGatewayFormCtrl)
    ;

    /**
     * @ngInject
     */
    function ForwardGatewayFormCtrl(Select, _, $rootScope) {
        var gatewayForm = this;

        gatewayForm.$onInit = init;
        gatewayForm.input = _.clone(INPUTS);
        gatewayForm.groups = Select('group').multi();

        //////////

        function init() {
            gatewayForm.form.getData = getData;

            if (gatewayForm.form.on) {
                gatewayForm.form.on(['change', 'load'], storeState);
            }
        }

        function fillFormInputs() {
            _.overwrite(gatewayForm.input, gatewayForm.form.input);
        }

        function storeState(response) {
            $rootScope.$evalAsync(function() {
                fillFormInputs();
            });
            _.setContents(gatewayForm.groups.selected, response.groups);
        }

        function getData() {
            var data = _.clone(gatewayForm.input);

            data.groups = _.map(gatewayForm.groups.selected, 'id');

            return data;
        }
    }
})();
