(function () {
  'use strict';

  var DIR = 'app/hardware/server/view/manage/panel';

  angular
    .module('app.hardware.server.view.manage')
    .factory('ServerManagePanelBandwidth', ServerManagePanelBandwidthFactory)
    ;

  /**
   * ServerManagePanelBandwidth Factory
   *
   * @ngInject
   */
  function ServerManagePanelBandwidthFactory (Config, BandwidthFilter, $state, date) {
    return function (server, $scope) {
        return new ServerManagePanelBandwidth(server, $scope, Config, BandwidthFilter, $state, date);
    };
  }

  function ServerManagePanelBandwidth (server, $scope, Config, BandwidthFilter, $state, date) {
    var panel = this;

    panel.templateUrl = DIR+'/panel.bandwidth.html';
    panel.context = {
      server: server,
      filter: BandwidthFilter(),
    };

    panel.context.filter.on('change', syncFilterToState);
    $scope.$on('$routeUpdate', syncStateToFilter);

    setDates();
    syncStateToFilter();

    //////////

    function setDates() {
      if (!$state.params['bandwidth.start']) {
        return Config
          .getServerBandwidthRange()
          .then(setFilterRange)
          ;
      }
    }

    function setFilterRange(range) {
      panel.context.filter.setRangeByLabel(range);
    }

    function syncStateToFilter() {
      if (!$state.params['bandwidth.start']) {
        return;
      }

      panel.context.filter.setRange(
        moment.utc(
          $state.params['bandwidth.start'],
          date.formatDateTime
        ).local(),
        moment.utc(
          $state.params['bandwidth.end'],
          date.formatDateTime
        ).local()
      );
    }

    function syncFilterToState() {
      var filter = panel.context.filter;
      $state.go($state.current.name, _.assign($state.params, {
        'bandwidth.start': filter.start.utc().format(date.formatDateTime),
        'bandwidth.end': filter.end.utc().format(date.formatDateTime),
      }), {location: 'replace'});
    }
  }
})();
