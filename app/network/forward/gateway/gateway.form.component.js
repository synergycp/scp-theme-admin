(function () {
    'use strict';

    var FORWARDING_TYPE = {
        PORT_TO_PORT: 'PORT_TO_PORT',
        IP_TO_IP: 'IP_TO_IP',
    };

    var INPUTS = {
        name: '',
        hostname: '',
        api_key: '',
        forwarding_type: FORWARDING_TYPE.PORT_TO_PORT,
        port_limit: '',
        usable_ips: '',
    };

    angular
        .module('app.network.forward.gateway')
        .component('forwardGatewayForm', {
            require: {},
            bindings: {
                isCreating: '@',
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
        gatewayForm.gateway = {};
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
            _.assign(gatewayForm.gateway, gatewayForm.form.input);
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
