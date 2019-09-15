(function () {
  'use strict';

  var DIR = 'system/license/widget/';

  angular
    .module('app.system.license.widget')
    .component('systemLicenseWidget', {
      require: {},
      bindings: {},
      controller: 'SystemLicenseWidgetCtrl as widget',
      templateUrl: 'app/system/license/widget/widget.html'
    })
    .controller('SystemLicenseWidgetCtrl', SystemLicenseWidgetCtrl);

  /**
   * @ngInject
   */
  function SystemLicenseWidgetCtrl(
    RouteHelpers,
    EventEmitter,
    Loader,
    LicenseService,
    $q
  ) {
    var widget = this;

    widget.templateUrl = RouteHelpers.basepath(DIR + 'widget.html');
    widget.license = {};
    widget.refresh = onRefresh;
    widget.loader = Loader();
    EventEmitter().bindTo(widget);
    widget.$onInit = init;

    //////////

    function init() {
      RouteHelpers.loadLang('license');
      load();

      LicenseService.onChange(load);
    }

    function onRefresh() {
      return widget.loader.during(
        $q.all([
          LicenseService.refresh(),
          LicenseService.getSkipCache(),
        ])
      );
    }

    function load() {
      return widget.loader.during(
        LicenseService
          .getLicense()
          .then(store)
      );
    }

    function store(license) {
      widget.serversInUse = license.serversInUse;
      widget.license.key = license.key;
      widget.license.servers = license.serversAllowed;
    }
  }
})();
