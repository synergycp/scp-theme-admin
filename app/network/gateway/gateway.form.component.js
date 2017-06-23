(function () {
    'use strict';

    var INPUTS = {
        hostname: '',
        port_limit: ''
    };

    angular
        .module('app.network')
        .component('gatewayForm', {
            require: {},
            bindings: {
                isCreating: '=?',
                alwaysDirty: '=?',
                form: '=',
            },
            controller: 'GatewayFormCtrl as gatewayForm',
            transclude: true,
            templateUrl: 'app/network/gateway/gateway.form.html'
        })
        .controller('GatewayFormCtrl', GatewayFormCtrl)
    ;

    /**
     * @ngInject
     */
    function GatewayFormCtrl(_, Api, Modal, GatewayFormPort, $rootScope, $stateParams, $q) {
        var gatewayForm = this;
        var $ports;

        gatewayForm.$onInit = init;
        gatewayForm.input = _.clone(INPUTS);

        gatewayForm.ports = [];
        gatewayForm.ports.add = addPort;
        gatewayForm.ports.remove = removePort;
        gatewayForm.ports.removed = [];

        //////////

        function init() {
            _.defaults(gatewayForm, {
                alwaysDirty: false,
                isCreating: false,
            });

            gatewayForm.form.getData = getData;
            fillFormInputs();

            if (!gatewayForm.form.on) {
                return;
            }

            gatewayForm.form
                .on(['load', 'change', 'created'], storeState)
                .on(['saving', 'created'], savePorts)
            ;

            if ($stateParams.id) {
                gatewayForm.id = $stateParams.id;
                $ports = Api.all('forward/gateway/' + gatewayForm.id + '/port');
                $ports.getList().then(storePorts)
                ;
            }
        }

        function getData() {
            return _.clone(gatewayForm.input);
        }

        function fillFormInputs() {
            _.overwrite(gatewayForm.input, gatewayForm.form.input);
        }

        function addPort() {
            gatewayForm.ports.push(GatewayFormPort());
        }

        function removePort(port) {
            if (port.id) {
                return confirmRemove(port)
                    .then(removeFromList)
                    .then(removeFromDatabase)
                    ;
            }

            removeFromList();

            function removeFromDatabase() {
                return $ports.one('' + port.id).remove();
            }

            function removeFromList() {
                _.remove(gatewayForm.ports, port);
            }
        }

        function storePorts(response) {
            _.each(response, function (portData) {
                var port = GatewayFormPort();
                port.fromExisting(portData);
                gatewayForm.ports.push(port);
            });
        }

        function confirmRemove(port) {
            return Modal
                .confirm([port.original], 'gateway.form.port.remove')
                .open()
                .result
                ;
        }

        function storeState(response) {
            gatewayForm.id = response.id;
            $ports = Api.all('forward/gateway/' + gatewayForm.id + '/port');

            $rootScope.$evalAsync(function () {
                fillFormInputs();
            });
        }

        function savePorts() {
            return $q.all(_.map(gatewayForm.ports, savePortChanges)).then(function () {
                gatewayForm.form.fire('created.relations');
            });
        }

        function savePortChanges(port) {
            var formData = port.data();

            formData.gateway_id = gatewayForm.id;

            if (formData.id) {
                return $ports
                    .one('' + formData.id)
                    .patch(formData)
                    .then(updateExisting)
                    ;
            }

            return $ports
                .post(formData)
                .then(updateExisting)
                ;

            function updateExisting(response) {
                if (!gatewayForm.isCreating) {
                    port.fromExisting(response, true);
                }
            }
        }
    }
})();
