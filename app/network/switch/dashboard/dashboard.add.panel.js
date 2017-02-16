(function () {
  'use strict';

  var DIR = 'network/switch/dashboard/';

  angular
    .module('app.network.switch.dashboard')
    .factory('DashboardAddPanel', DashboardAddPanelFactory);

  /**
   * DashboardAddPanel Factory
   *
   * @ngInject
   */
  function DashboardAddPanelFactory(
    RouteHelpers,
    EventEmitter,
    $rootScope,
    Select,
    Loader,
    Alert,
    Api
  ) {
    return function () {
      return new DashboardAddPanel(
        RouteHelpers,
        EventEmitter,
        $rootScope,
        Select,
        Loader,
        Alert,
        Api
      );
    };
  }

  function DashboardAddPanel(
    RouteHelpers,
    EventEmitter,
    $rootScope,
    Select,
    Loader,
    Alert,
    Api
  ) {
    var panel = this;
    var $api = Api.all('switch');

    panel.templateUrl = RouteHelpers.basepath(DIR + 'dashboard.add.html');
    panel.context = {
      switch: Select('switch').on('change', syncSwitch),
      port: null,
      submit: onSubmit,
      loader: Loader(),
    };
    EventEmitter().bindTo(panel);

    RouteHelpers.loadLang('switch');

    //////////

    function syncSwitch(sw) {
      panel.context.port = Select('switch/' + sw.id + '/port')
        .filter({ 'sort[]': '-primary' })
      ;
      panel.context.port.load();
    }

    function onSubmit() {
      var switchId = panel.context.switch.getSelected('id');
      var data = {
        port: {
          id: panel.context.port.getSelected('id'),
        },
      };

      if (!switchId) {
        Alert.warning('Please select a switch.');
      }

      return panel.context.loader.during(
        $api
        .one('' + switchId)
        .all('home')
        .post(data)
        .then(fireAddEvent)
      );
    }

    function fireAddEvent(item) {
      panel.fire('add', item);
    }
  }
})();
