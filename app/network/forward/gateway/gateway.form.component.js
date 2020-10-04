(function () {
    'use strict';

    var INPUTS = {
        name: '',
        hostname: '',
        api_key: '',
        forwarding_type: 0,
        port_limit: '',
        usable_ips: '',
    };

    var FORWARDING_TYPE = {
        PORT_TO_PORT: 'PORT_TO_PORT',
        IP_TO_IP: 'IP_TO_IP',
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
        gatewayForm.FORWARDING_TYPE = FORWARDING_TYPE;

        //////////

        function init() {
            gatewayForm.form.getData = getData;

            if (gatewayForm.form.on) {
                gatewayForm.form.on(['change', 'load'], storeState);
            }
        }

        function fillFormInputs() {
            _.overwrite(gatewayForm.input, gatewayForm.form.input);
            gatewayForm.input.usable_ips = (gatewayForm.form.input.usable_ips || []).join(', ');
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
