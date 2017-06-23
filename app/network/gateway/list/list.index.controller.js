(function () {
    'use strict';

    angular
        .module('app.network.gateway')
        .controller('GatewayIndexCtrl', GatewayIndexCtrl)
    ;

    /**
     * GatewayIndex Controller
     *
     * @ngInject
     */
    function GatewayIndexCtrl(GatewayList, ListFilter, EventEmitter) {
        var vm = this;

        vm.list = GatewayList();
        vm.filters = ListFilter(vm.list);
        vm.create = {
            input: {},
            submit: create,
        };
        EventEmitter().bindTo(vm.create);

        vm.create.on('created.relations', vm.list.refresh.now);

        vm.logs = {
            filter: {
                target_type: 'forward.gateway',
            },
        };

        activate();

        ////////////

        function activate() {
        }

        function create() {
            vm.list
                .create(vm.create.getData())
                .then(vm.create.fire.bind(null, 'created'))
            ;
        }
    }
})();
