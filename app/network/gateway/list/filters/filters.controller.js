(function () {
    'use strict';

    angular
        .module('app.network.gateway.list.filters')
        .controller('GatewayFiltersCtrl', GatewayFiltersCtrl)
    ;

    /**
     * @ngInject
     */
    function GatewayFiltersCtrl(Observable, $state, $q, $timeout) {
        var filters = this;

        filters.$onInit = init;
        filters.$onChanges = $onChanges;

        filters.current = {
            q: $state.params.q,
        };

        filters.searchFocus = Observable(false);
        filters.fireChangeEvent = fireChangeEvent;

        //////////

        function init() {
            var promises = [
                $timeout(),
            ];

            $q.all(promises).then(fireChangeEvent)
            ;
        }

        function fireChangeEvent() {
            _.assign(filters.current);

            $state.go($state.current.name, {
                'q': filters.current.q,
            });

            if (filters.change) {
                filters.change();
            }
        }

        function $onChanges(changes) {
            if (changes.show) {
                var onShow = filters.searchFocus.set.bind(null, true);
                (changes.show.currentValue ? onShow : angular.noop)();
            }
        }
    }
})();
