(function () {
    'use strict';

    angular
        .module('app.network.gateway')
        .factory('GatewayFormPort', GatewayFormPort)
    ;

    /**
     * @ngInject
     * @constructor
     */
    function GatewayFormPort(Select, $stateParams, $q, Api) {
        return function () {
            return new GatewayPort(Select, $stateParams, $q, Api);
        };
    }

    /**
     * @constructor
     */
    function GatewayPort(Select) {
        var port = this;

        port.input = {
            type: '',
            src_port: '',
            dest_ip: '',
            dest_port: '',
            is_acl_enabled: '',
        };

        port.type = Select('forward/type');

        port.data = data;
        port.fromExisting = fromExisting;

        function fromExisting(response) {
            port.id = response.id;
            port.original = response;
            port.input.src_port = response.src_port;
            port.input.dest_ip = response.dest_ip;
            port.input.dest_port = response.dest_port;
            port.input.is_acl_enabled = !!response.is_acl_enabled;

            if (port.type.getSelected('id') != response.type.id) {
                port.type.selected = response.type;
            }
        }

        function data() {
            return {
                id: port.id,
                src_port: port.input.src_port,
                dest_ip: port.input.dest_ip,
                dest_port: port.input.dest_port,
                is_acl_enabled: port.input.is_acl_enabled,
                type: {id: port.type.getSelected('id') || null},
            };
        }
    }
})();

